// Luna 7.2 creates a fresh object URL for each texture image but never revokes it.
// Texture images are detached upload sources, so their URLs are no longer needed
// after decoding. Keep the decoded image available for later WebGL uploads.
(function () {
    "use strict";
    if (typeof window === "undefined" || window.__lunaTextureBlobCleanup) return;
    var urlApi = window.URL;
    var imageType = window.HTMLImageElement;
    if (!urlApi || !urlApi.createObjectURL || !imageType) return;
    var descriptor = Object.getOwnPropertyDescriptor(imageType.prototype, "src");
    if (!descriptor || !descriptor.configurable || !descriptor.set) return;

    var pending = Object.create(null);
    var create = urlApi.createObjectURL;
    var revoke = urlApi.revokeObjectURL;
    var stats = { created: 0, released: 0 };

    urlApi.createObjectURL = function (blob) {
        var url = create.call(urlApi, blob);
        if (blob && /^image\//i.test(blob.type)) {
            pending[url] = true;
            stats.created++;
        }
        return url;
    };

    Object.defineProperty(imageType.prototype, "src", {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get: descriptor.get,
        set: function (value) {
            if (typeof value === "string" && pending[value] && !this.isConnected) {
                var image = this;
                var release = function () {
                    image.removeEventListener("load", release);
                    image.removeEventListener("error", release);
                    // Allow Luna's onload handler to consume the image first.
                    window.setTimeout(function () {
                        if (!pending[value]) return;
                        delete pending[value];
                        revoke.call(urlApi, value);
                        stats.released++;
                    }, 0);
                };
                image.addEventListener("load", release);
                image.addEventListener("error", release);
            }
            descriptor.set.call(this, value);
        }
    });
    window.__lunaTextureBlobCleanup = stats;
}());
