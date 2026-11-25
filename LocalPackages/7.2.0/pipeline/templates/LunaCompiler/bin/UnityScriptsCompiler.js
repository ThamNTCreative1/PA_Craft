/**
 * @version 1.0.9803.32678
 * @copyright anton
 * @compiler Bridge.NET 17.9.42-luna
 */
Bridge.assembly("UnityScriptsCompiler", function ($asm, globals) {
    "use strict";

    /*BoxingRingGame start.*/
    Bridge.define("BoxingRingGame", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            methods: {
                /*BoxingRingGame.Evaluate:static start.*/
                Evaluate: function (ease, p) {
                    switch (ease) {
                        case BoxingRingGame.Ease.ElasticOut05: 
                            return BoxingRingGame.Elastic(p, 1.0, 0.5);
                        case BoxingRingGame.Ease.ElasticOut04: 
                            return BoxingRingGame.Elastic(p, 1.0, 0.4);
                        case BoxingRingGame.Ease.BackOut17: 
                            return BoxingRingGame.Back(p, 1.7);
                        case BoxingRingGame.Ease.BackOut15: 
                            return BoxingRingGame.Back(p, 1.5);
                        case BoxingRingGame.Ease.Power1InOut: 
                            return p < 0.5 ? 2.0 * p * p : 1.0 - 2.0 * (1.0 - p) * (1.0 - p);
                    }
                    return p;
                },
                /*BoxingRingGame.Evaluate:static end.*/

                /*BoxingRingGame.Elastic:static start.*/
                Elastic: function (p, amplitude, period) {
                    if (p >= 1.0) {
                        return 1.0;
                    }
                    var p1 = amplitude >= 1.0 ? amplitude : 1.0;
                    var p2 = period / (amplitude < 1.0 ? amplitude : 1.0);
                    var p3 = p2 / (6.28318548) * Math.asin(1.0 / p1);
                    return p1 * Math.pow(2.0, -10.0 * p) * Math.sin((p - p3) * (6.28318548 / p2)) + 1.0;
                },
                /*BoxingRingGame.Elastic:static end.*/

                /*BoxingRingGame.Back:static start.*/
                Back: function (p, o) {
                    p -= 1.0;
                    return p * p * ((o + 1.0) * p + o) + 1.0;
                },
                /*BoxingRingGame.Back:static end.*/


            }
        },
        fields: {
            cam: null,
            ringRoot: null,
            placeholder: null,
            parts: null,
            critters: null,
            friend: null,
            fighters: null,
            friendScale: 0,
            trees: null,
            bushes: null,
            instruction: null,
            instructionLayers: null,
            hand: null,
            handGroup: null,
            cta: null,
            ctaGroup: null,
            playButton: null,
            landscapePlayButton: null,
            cssPx: 0,
            heartSprite: null,
            sfx: null,
            lunaController: null,
            tapClips: null,
            startText: null,
            keepText: null,
            stage: 0,
            happy: false,
            clock: 0,
            critterBaseY: null,
            instrBase: null,
            ctaBase: null,
            downPos: null,
            downValid: false,
            live: null,
            pool: null
        },
        ctors: {
            init: function () {
                this.instrBase = new UnityEngine.Vector2();
                this.ctaBase = new UnityEngine.Vector2();
                this.downPos = new UnityEngine.Vector2();
                this.fighters = System.Array.init(0, null, UnityEngine.GameObject);
                this.friendScale = 0.5;
                this.instructionLayers = System.Array.init(0, null, UnityEngine.UI.Text);
                this.cssPx = 2.77;
                this.startText = "TAP TO BUILD A RING!";
                this.keepText = "KEEP GOING!";
                this.live = new (System.Collections.Generic.List$1(BoxingRingGame.Particle)).ctor();
                this.pool = new (System.Collections.Generic.Stack$1(BoxingRingGame.Particle)).ctor();
            }
        },
        methods: {
            /*BoxingRingGame.Awake start.*/
            Awake: function () {
                var $t;
                if (UnityEngine.Component.op_Equality(this.cam, null)) {
                    this.cam = UnityEngine.Camera.main;
                }
                for (var i = 0; i < this.parts.length; i = (i + 1) | 0) {
                    this.parts[i].localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( 0.01 );
                    this.parts[i].gameObject.SetActive(false);
                }
                if (UnityEngine.GameObject.op_Inequality(this.placeholder, null)) {
                    this.placeholder.SetActive(true);
                }
                if (UnityEngine.Component.op_Inequality(this.friend, null)) {
                    this.friend.localScale = pc.Vec3.ZERO.clone();
                    this.friend.gameObject.SetActive(false);
                }
                for (var i1 = 0; i1 < this.bushes.length; i1 = (i1 + 1) | 0) {
                    this.bushes[i1].localScale = pc.Vec3.ZERO.clone();
                }
                this.critterBaseY = System.Array.init(this.critters.length, 0, System.Single);
                for (var i2 = 0; i2 < this.critters.length; i2 = (i2 + 1) | 0) {
                    this.critterBaseY[i2] = this.critters[i2].localScale.y;
                }
                if (UnityEngine.Component.op_Inequality(this.cta, null)) {
                    this.ctaBase = this.cta.anchoredPosition.$clone();
                    this.cta.gameObject.SetActive(false);
                }
                if (UnityEngine.MonoBehaviour.op_Inequality(this.instruction, null)) {
                    this.CreateInstructionLayers();
                    this.SetInstruction(this.startText);
                    this.instrBase = this.instruction.rectTransform.anchoredPosition.$clone();
                }
                $t = Bridge.getEnumerator(this.fighters);
                try {
                    while ($t.moveNext()) {
                        var fighter = $t.Current;
                        if (UnityEngine.GameObject.op_Inequality(fighter, null)) {
                            fighter.SetActive(false);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*BoxingRingGame.Awake end.*/

            /*BoxingRingGame.Update start.*/
            Update: function () {
                var dt = UnityEngine.Time.deltaTime;
                this.clock += dt;

                var canBuild = UnityEngine.MonoBehaviour.op_Equality(this.lunaController, null) || !this.lunaController.IsCtaReady;
                if (canBuild && UnityEngine.Input.GetMouseButtonDown(0)) {
                    this.downPos = UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition.$clone());
                    this.downValid = true;
                }
                if (UnityEngine.Input.GetMouseButtonUp(0) && this.downValid) {
                    this.downValid = false;
                    var up = UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition.$clone());
                    var th = 10.0 * UnityEngine.Mathf.Max(1.0, UnityEngine.Screen.height / 800.0);
                    if (canBuild && Math.abs(up.x - this.downPos.x) < th && Math.abs(up.y - this.downPos.y) < th && this.HitsBuildGrid(up)) {
                        this.HandleTap();
                    }
                }

                this.AnimateUI();
                this.AnimateCritters(dt);
                this.UpdateParticles(dt);
            },
            /*BoxingRingGame.Update end.*/

            /*BoxingRingGame.HitsBuildGrid start.*/
            HitsBuildGrid: function (screenPoint) {
                if (UnityEngine.Component.op_Inequality(this.landscapePlayButton, null) && this.landscapePlayButton.gameObject.activeInHierarchy && UnityEngine.RectTransformUtility.RectangleContainsScreenPoint(this.landscapePlayButton, screenPoint)) {
                    return false;
                }
                if (UnityEngine.GameObject.op_Equality(this.placeholder, null) || UnityEngine.Component.op_Equality(this.cam, null)) {
                    return true;
                }
                var grid = this.placeholder.transform;
                var center = this.BuildTarget();
                var ray = this.cam.ScreenPointToRay(UnityEngine.Vector3.FromVector2(screenPoint));
                var plane = new UnityEngine.Plane.$ctor2(grid.forward, center);
                var distance = { };
                if (!plane.Raycast(ray, distance)) {
                    return false;
                }
                var local = grid.InverseTransformVector(ray.GetPoint(distance.v).sub( center ));
                return Math.abs(local.x) <= 0.5 && Math.abs(local.y) <= 0.5;
            },
            /*BoxingRingGame.HitsBuildGrid end.*/

            /*BoxingRingGame.BuildTarget start.*/
            BuildTarget: function () {
                var center = this.placeholder.transform.position.$clone();
                if (this.stage > 0) {
                    center.y = this.ringRoot.TransformPoint$1(pc.Vec3.UP.clone()).y;
                }
                return center.$clone();
            },
            /*BoxingRingGame.BuildTarget end.*/

            /*BoxingRingGame.HandleTap start.*/
            HandleTap: function () {
                if (UnityEngine.MonoBehaviour.op_Inequality(this.lunaController, null)) {
                    this.lunaController.RegisterClick();
                }
                if (this.stage >= this.parts.length) {
                    return;
                }
                if (this.stage === 0) {
                    if (UnityEngine.Component.op_Inequality(this.hand, null)) {
                        this.hand.gameObject.SetActive(false);
                    }
                    if (UnityEngine.GameObject.op_Inequality(this.placeholder, null)) {
                        this.placeholder.SetActive(false);
                    }
                    this.SetInstruction(this.keepText);
                }
                this.PlayTapSound(this.stage);
                this.stage = (this.stage + 1) | 0;
                var p = this.parts[((this.stage - 1) | 0)];
                p.gameObject.SetActive(true);
                this.StartCoroutine$1(this.Scale(p, new pc.Vec3( 1, 1, 1 ).clone().scale( 0.01 ), new pc.Vec3( 1, 1, 1 ), 0.8, BoxingRingGame.Ease.ElasticOut05, 0.0));
                this.StartCoroutine$1(this.Scale(this.ringRoot, new pc.Vec3( 1.05, 0.9, 1.05 ), new pc.Vec3( 1, 1, 1 ), 0.4, BoxingRingGame.Ease.BackOut17, 0.0));
                this.SpawnParticles(this.ringRoot.position.$clone().add( new pc.Vec3( 0.0, this.stage * 1.0, 0.0 ) ));
                if (this.stage === this.parts.length) {
                    this.StartCoroutine$1(this.Payoff());
                }
            },
            /*BoxingRingGame.HandleTap end.*/

            /*BoxingRingGame.CreateInstructionLayers start.*/
            CreateInstructionLayers: function () {
                this.instructionLayers = System.Array.init(9, null, UnityEngine.UI.Text);
                for (var i = 0; i < this.instructionLayers.length; i = (i + 1) | 0) {
                    var foreground = i === 8;
                    var layerObject = new UnityEngine.GameObject.$ctor4(foreground ? "Instruction Fill" : "Instruction Border", [UnityEngine.RectTransform, UnityEngine.UI.Text]);
                    var rect = Bridge.cast(layerObject.transform, UnityEngine.RectTransform);
                    rect.SetParent(this.instruction.rectTransform, false);
                    rect.anchorMin = pc.Vec2.ZERO.clone();
                    rect.anchorMax = pc.Vec2.ONE.clone();
                    rect.sizeDelta = pc.Vec2.ZERO.clone();
                    if (!foreground) {
                        var angle = i * UnityEngine.Mathf.PI / 4.0;
                        rect.anchoredPosition = new pc.Vec2( Math.cos(angle), Math.sin(angle) ).scale( (1.8 * this.cssPx) );
                    }

                    var layer = layerObject.GetComponent(UnityEngine.UI.Text);
                    layer.font = this.instruction.font;
                    layer.fontSize = this.instruction.fontSize;
                    layer.fontStyle = this.instruction.fontStyle;
                    layer.alignment = this.instruction.alignment;
                    layer.horizontalOverflow = this.instruction.horizontalOverflow;
                    layer.verticalOverflow = this.instruction.verticalOverflow;
                    layer.resizeTextForBestFit = this.instruction.resizeTextForBestFit;
                    layer.resizeTextMinSize = this.instruction.resizeTextMinSize;
                    layer.resizeTextMaxSize = this.instruction.resizeTextMaxSize;
                    layer.color = foreground ? this.instruction.color.$clone() : new pc.Color( 0, 0, 0, 1 );
                    layer.raycastTarget = false;
                    this.instructionLayers[i] = layer;
                }
                this.instruction.enabled = false;
            },
            /*BoxingRingGame.CreateInstructionLayers end.*/

            /*BoxingRingGame.SetInstruction start.*/
            SetInstruction: function (text) {
                var $t;
                if (UnityEngine.MonoBehaviour.op_Inequality(this.instruction, null)) {
                    this.instruction.text = text;
                }
                $t = Bridge.getEnumerator(this.instructionLayers);
                try {
                    while ($t.moveNext()) {
                        var layer = $t.Current;
                        layer.text = text;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /*BoxingRingGame.SetInstruction end.*/

            /*BoxingRingGame.PlayTapSound start.*/
            PlayTapSound: function (i) {
                if (UnityEngine.Component.op_Equality(this.sfx, null) || this.tapClips == null || this.tapClips.length === 0) {
                    return;
                }
                this.sfx.PlayOneShot(this.tapClips[UnityEngine.Mathf.Min(i, ((this.tapClips.length - 1) | 0))]);
            },
            /*BoxingRingGame.PlayTapSound end.*/

            /*BoxingRingGame.Payoff start.*/
            Payoff: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $t,
                    fighter,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(0.8);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    $t = Bridge.getEnumerator(this.fighters);
                                        try {
                                            while ($t.moveNext()) {
                                                fighter = $t.Current;
                                                if (UnityEngine.GameObject.op_Inequality(fighter, null)) {
                                                    fighter.SetActive(true);
                                                }
                                            }
                                        } finally {
                                            if (Bridge.is($t, System.IDisposable)) {
                                                $t.System$IDisposable$Dispose();
                                            }
                                        }
                                        this.happy = true;
                                        if (UnityEngine.MonoBehaviour.op_Inequality(this.instruction, null)) {
                                            this.instruction.gameObject.SetActive(false);
                                        }

                                        for (var i = 0; i < this.trees.length; i = (i + 1) | 0) {
                                            this.StartCoroutine$1(this.Scale(this.trees[i], new pc.Vec3( 1.1, 0.8, 1.1 ), new pc.Vec3( 1, 1, 1 ), 1.0, BoxingRingGame.Ease.ElasticOut04, 0.1 * i));
                                        }
                                        for (var i1 = 0; i1 < this.bushes.length; i1 = (i1 + 1) | 0) {
                                            this.StartCoroutine$1(this.Scale(this.bushes[i1], pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 1, 1 ), 1.0, BoxingRingGame.Ease.ElasticOut05, 0.2 + 0.1 * i1));
                                        }

                                        if (UnityEngine.Component.op_Inequality(this.friend, null)) {
                                            this.friend.gameObject.SetActive(true);
                                            this.StartCoroutine$1(this.Scale(this.friend, pc.Vec3.ZERO.clone(), new pc.Vec3( 1, 1, 1 ).clone().scale( this.friendScale ), 1.0, BoxingRingGame.Ease.ElasticOut04, 0.0));
                                            this.StartCoroutine$1(this.Bounce(this.friend, 3.5, 0.3, 4));
                                        }
                                        for (var i2 = 0; i2 < this.critters.length; i2 = (i2 + 1) | 0) {
                                            this.StartCoroutine$1(this.Bounce(this.critters[i2], 2.0, 0.3, 4));
                                            this.SpawnParticles(this.critters[i2].position);
                                        }
                                        this.SpawnParticles(this.ringRoot.position.$clone().add( new pc.Vec3( 0.0, 4.0, 0.0 ) ));

                                        $enumerator.current = new UnityEngine.WaitForSeconds(1.0);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    if (UnityEngine.Component.op_Inequality(this.cta, null)) {
                                            this.cta.gameObject.SetActive(true);
                                            this.StartCoroutine$1(this.ShowCta());
                                        }

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*BoxingRingGame.Payoff end.*/

            /*BoxingRingGame.ShowCta start.*/
            ShowCta: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    t,
                    d,
                    k,
                    e,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    t = 0.0;
                                        d = 0.5;
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( t < d ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    t += UnityEngine.Time.deltaTime;
                                        k = Math.max(0, Math.min(1, t / d));
                                        e = BoxingRingGame.Evaluate(BoxingRingGame.Ease.BackOut15, k);
                                        this.cta.anchoredPosition = this.ctaBase.$clone().add( new pc.Vec2( 0.0, -50.0 * this.cssPx * (1.0 - e) ) );
                                        if (UnityEngine.MonoBehaviour.op_Inequality(this.ctaGroup, null)) {
                                            this.ctaGroup.alpha = Math.max(0, Math.min(1, e));
                                        }
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    this.cta.anchoredPosition = this.ctaBase.$clone();
                                        if (UnityEngine.MonoBehaviour.op_Inequality(this.ctaGroup, null)) {
                                            this.ctaGroup.alpha = 1.0;
                                        }

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*BoxingRingGame.ShowCta end.*/

            /*BoxingRingGame.OnPlayClicked start.*/
            OnPlayClicked: function () {
                if (UnityEngine.MonoBehaviour.op_Inequality(this.lunaController, null)) {
                    this.lunaController.OpenCta();
                }
            },
            /*BoxingRingGame.OnPlayClicked end.*/

            /*BoxingRingGame.ApplyLayout start.*/
            ApplyLayout: function (landscape) {
                if (UnityEngine.Component.op_Inequality(this.cta, null)) {
                    this.cta.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (landscape ? 1.65 : 1.0) );
                }
                if (UnityEngine.Component.op_Inequality(this.landscapePlayButton, null) && this.landscapePlayButton.gameObject.activeSelf !== landscape) {
                    this.landscapePlayButton.gameObject.SetActive(landscape);
                }
            },
            /*BoxingRingGame.ApplyLayout end.*/

            /*BoxingRingGame.LateUpdate start.*/
            LateUpdate: function () {
                this.ApplyLayout(UnityEngine.Screen.width > UnityEngine.Screen.height);
                if (UnityEngine.Component.op_Equality(this.hand, null) || !this.hand.gameObject.activeSelf || UnityEngine.Component.op_Equality(this.cam, null) || UnityEngine.GameObject.op_Equality(this.placeholder, null)) {
                    return;
                }
                var parent = Bridge.cast(this.hand.parent, UnityEngine.RectTransform);
                var point = { v : new UnityEngine.Vector2() };
                UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(parent, UnityEngine.Vector2.FromVector3(this.cam.WorldToScreenPoint(this.BuildTarget())), null, point);
                var press = 0.5 - 0.5 * Math.cos(this.clock * (5.23598766));
                this.hand.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( (1.0 - 0.1 * press) );
                this.hand.localPosition = UnityEngine.Vector3.FromVector2(point.v.$clone().add( new pc.Vec2( 7.0, -9.0 ).scale( this.cssPx ).scale( (1.0 - press) ) ));
            },
            /*BoxingRingGame.LateUpdate end.*/

            /*BoxingRingGame.AnimateUI start.*/
            AnimateUI: function () {
                if (UnityEngine.MonoBehaviour.op_Inequality(this.instruction, null) && this.instruction.gameObject.activeSelf) {
                    // css: bounce 1s infinite alternate, translateY(0 -> -10px)
                    var ph = UnityEngine.Mathf.PingPong(this.clock, 1.0);
                    var e = ph * ph * (3.0 - 2.0 * ph);
                    this.instruction.rectTransform.anchoredPosition = this.instrBase.$clone().add( new pc.Vec2( 0.0, 10.0 * this.cssPx * e ) );
                }
                if (UnityEngine.Component.op_Inequality(this.playButton, null) && UnityEngine.Component.op_Inequality(this.cta, null) && this.cta.gameObject.activeSelf) {
                    var ph1 = (this.clock % 1.5) / 1.5;
                    var s = 1.0 + 0.05 * (0.5 - 0.5 * Math.cos(ph1 * 2.0 * UnityEngine.Mathf.PI));
                    this.playButton.localScale = new pc.Vec3( 1, 1, 1 ).clone().scale( s );
                }
            },
            /*BoxingRingGame.AnimateUI end.*/

            /*BoxingRingGame.AnimateCritters start.*/
            AnimateCritters: function (dt) {
                for (var i = 0; i < this.critters.length; i = (i + 1) | 0) {
                    var c = this.critters[i];
                    var s = c.localScale.$clone();
                    if (this.happy) {
                        s.y = this.critterBaseY[i];
                        c.Rotate(0.0, 2.0 * dt * UnityEngine.Mathf.Rad2Deg, 0.0, UnityEngine.Space.World);
                        var head = c.Find("head");
                        if (UnityEngine.Component.op_Inequality(head, null)) {
                            head.localEulerAngles = new pc.Vec3( (0.1 * Math.sin(5.0 * this.clock + i) - 0.1) * UnityEngine.Mathf.Rad2Deg, 0.0, 0.0 );
                        }
                    } else {
                        s.y = this.critterBaseY[i] + 0.02 * Math.sin(3.0 * this.clock + i);
                    }
                    c.localScale = s.$clone();
                }
                if (UnityEngine.Component.op_Inequality(this.friend, null) && this.happy) {
                    this.friend.Rotate(0.0, -2.0 * dt * UnityEngine.Mathf.Rad2Deg, 0.0, UnityEngine.Space.World);
                    var head1 = this.friend.Find("head");
                    if (UnityEngine.Component.op_Inequality(head1, null)) {
                        head1.localEulerAngles = new pc.Vec3( (0.1 * Math.sin(6.0 * this.clock) - 0.1) * UnityEngine.Mathf.Rad2Deg, 0.0, 0.0 );
                    }
                    var tail = this.friend.Find("tail");
                    if (UnityEngine.Component.op_Inequality(tail, null)) {
                        tail.localEulerAngles = new pc.Vec3( 0.0, -45.0 + 0.2 * Math.sin(10.0 * this.clock) * UnityEngine.Mathf.Rad2Deg, 0.0 );
                    }
                }
            },
            /*BoxingRingGame.AnimateCritters end.*/

            /*BoxingRingGame.Scale start.*/
            Scale: function (t, from, to, dur, ease, delay) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    time,
                    e,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    if (delay > 0.0) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                }
                                case 1: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(delay);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    $step = 3;
                                    continue;
                                }
                                case 3: {
                                    time = 0.0;
                                        t.localScale = from.$clone();
                                    $step = 4;
                                    continue;
                                }
                                case 4: {
                                    if ( time < dur ) {
                                            $step = 5;
                                            continue;
                                        } 
                                        $step = 7;
                                        continue;
                                }
                                case 5: {
                                    time += UnityEngine.Time.deltaTime;
                                        e = BoxingRingGame.Evaluate(ease, Math.max(0, Math.min(1, time / dur)));
                                        t.localScale = from.$clone().add( (to.$clone().sub( from )).clone().scale( e ) );
                                        $enumerator.current = null;
                                        $step = 6;
                                        return true;
                                }
                                case 6: {
                                    
                                        $step = 4;
                                        continue;
                                }
                                case 7: {
                                    t.localScale = to.$clone();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*BoxingRingGame.Scale end.*/

            /*BoxingRingGame.Bounce start.*/
            Bounce: function (t, peak, dur, halves) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    baseY,
                    h,
                    time,
                    up,
                    e,
                    k,
                    p,
                    end,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    baseY = t.localPosition.y;
                                        h = 0;
                                        $step = 1;
                                        continue;
                                }
                                case 1: {
                                    if ( h < halves ) {
                                            $step = 2;
                                            continue;
                                        }
                                    $step = 8;
                                    continue;
                                }
                                case 2: {
                                    time = 0.0;
                                        up = (h % 2) === 0;
                                    $step = 3;
                                    continue;
                                }
                                case 3: {
                                    if ( time < dur ) {
                                            $step = 4;
                                            continue;
                                        } 
                                        $step = 6;
                                        continue;
                                }
                                case 4: {
                                    time += UnityEngine.Time.deltaTime;
                                        e = BoxingRingGame.Evaluate(BoxingRingGame.Ease.Power1InOut, Math.max(0, Math.min(1, time / dur)));
                                        k = up ? e : 1.0 - e;
                                        p = t.localPosition.$clone();
                                        p.y = baseY + (peak - baseY) * k;
                                        t.localPosition = p.$clone();
                                        $enumerator.current = null;
                                        $step = 5;
                                        return true;
                                }
                                case 5: {
                                    
                                        $step = 3;
                                        continue;
                                }
                                case 6: {
                                    $step = 7;
                                    continue;
                                }
                                case 7: {
                                    h = (h + 1) | 0;
                                    $step = 1;
                                    continue;
                                }
                                case 8: {
                                    end = t.localPosition.$clone();
                                        end.y = baseY;
                                        t.localPosition = end.$clone();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*BoxingRingGame.Bounce end.*/

            /*BoxingRingGame.SpawnParticles start.*/
            SpawnParticles: function (at) {
                if (this.heartSprite == null) {
                    return;
                }
                for (var i = 0; i < 15; i = (i + 1) | 0) {
                    var p = this.pool.Count > 0 ? this.pool.Pop() : this.CreateParticle();
                    p.t.gameObject.SetActive(true);
                    p.t.position = at.$clone().add( new pc.Vec3( UnityEngine.Random.value - 0.5, UnityEngine.Random.value - 0.5, UnityEngine.Random.value - 0.5 ) );
                    var s = 0.3 + 0.4 * UnityEngine.Random.value;
                    p.t.localScale = new pc.Vec3( s, s, s );
                    p.sr.color = new pc.Color( 1, 1, 1, 1 );
                    p.v = new pc.Vec3( 6.0 * (UnityEngine.Random.value - 0.5), 5.0 * UnityEngine.Random.value + 3.0, 6.0 * (UnityEngine.Random.value - 0.5) );
                    p.life = 1.0;
                    this.live.add(p);
                }
            },
            /*BoxingRingGame.SpawnParticles end.*/

            /*BoxingRingGame.CreateParticle start.*/
            CreateParticle: function () {
                var go = new UnityEngine.GameObject.$ctor2("Heart");
                go.transform.SetParent(this.transform, false);
                var sr = go.AddComponent(UnityEngine.SpriteRenderer);
                sr.sprite = this.heartSprite;
                var p = new BoxingRingGame.Particle();
                p.t = go.transform;
                p.sr = sr;
                return p;
            },
            /*BoxingRingGame.CreateParticle end.*/

            /*BoxingRingGame.UpdateParticles start.*/
            UpdateParticles: function (dt) {
                var face = UnityEngine.Component.op_Inequality(this.cam, null) ? this.cam.transform.rotation.$clone() : pc.Quat.IDENTITY.clone();
                for (var i = (this.live.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var p = this.live.getItem(i);
                    p.v.y -= 9.8 * dt;
                    p.t.position = p.t.position.$clone().add( p.v.$clone().clone().scale( dt ) );
                    p.t.rotation = face.$clone();
                    p.life -= dt;
                    if (p.life < 0.5) {
                        p.sr.color = new pc.Color( 1.0, 1.0, 1.0, Math.max(0, Math.min(1, 2.0 * p.life)) );
                        p.t.localScale = p.t.localScale.$clone().clone().scale( Math.pow(0.95, dt * 60.0) );
                    }
                    if (p.life <= 0.0 || p.t.position.y < 0.0) {
                        p.t.gameObject.SetActive(false);
                        this.live.removeAt(i);
                        this.pool.Push(p);
                    }
                }
            },
            /*BoxingRingGame.UpdateParticles end.*/


        }
    });
    /*BoxingRingGame end.*/

    /*BoxingRingGame+Ease start.*/
    Bridge.define("BoxingRingGame.Ease", {
        $kind: 1006,
        statics: {
            fields: {
                Linear: 0,
                ElasticOut05: 1,
                ElasticOut04: 2,
                BackOut17: 3,
                BackOut15: 4,
                Power1InOut: 5
            }
        }
    });
    /*BoxingRingGame+Ease end.*/

    /*BoxingRingGame+Particle start.*/
    Bridge.define("BoxingRingGame.Particle", {
        $kind: 1002,
        fields: {
            t: null,
            sr: null,
            v: null,
            life: 0
        },
        ctors: {
            init: function () {
                this.v = new UnityEngine.Vector3();
            }
        }
    });
    /*BoxingRingGame+Particle end.*/

    /*BoxingRingOrbit start.*/
    Bridge.define("BoxingRingOrbit", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            target: null,
            portraitPosition: null,
            landscapePosition: null,
            dampingFactor: 0,
            minDistance: 0,
            maxDistance: 0,
            maxPolarAngle: 0,
            theta: 0,
            phi: 0,
            radius: 0,
            dTheta: 0,
            dPhi: 0,
            scale: 0,
            lastW: 0,
            lastH: 0,
            lastMouse: null,
            dragging: false,
            lastPinch: 0
        },
        ctors: {
            init: function () {
                this.target = new UnityEngine.Vector3();
                this.portraitPosition = new UnityEngine.Vector3();
                this.landscapePosition = new UnityEngine.Vector3();
                this.lastMouse = new UnityEngine.Vector2();
                this.target = new pc.Vec3( 0.0, 2.0, 0.0 );
                this.portraitPosition = new pc.Vec3( 22.0, 28.0, 30.0 );
                this.landscapePosition = new pc.Vec3( 18.0, 16.0, 24.0 );
                this.dampingFactor = 0.05;
                this.minDistance = 5.0;
                this.maxDistance = 40.0;
                this.maxPolarAngle = 1.67079639;
                this.scale = 1.0;
            }
        },
        methods: {
            /*BoxingRingOrbit.Start start.*/
            Start: function () {
                this.ResetView();
            },
            /*BoxingRingOrbit.Start end.*/

            /*BoxingRingOrbit.ResetView start.*/
            ResetView: function () {
                this.lastW = UnityEngine.Screen.width;
                this.lastH = UnityEngine.Screen.height;
                var p = UnityEngine.Screen.width < UnityEngine.Screen.height ? this.portraitPosition.$clone() : this.landscapePosition.$clone();
                var off = p.$clone().sub( this.target );
                this.radius = off.length();
                this.theta = Math.atan2(off.x, off.z);
                this.phi = Math.acos(Math.max(-1.0, Math.min(off.y / this.radius, 1.0)));
                this.dTheta = (this.dPhi = 0.0);
                this.scale = 1.0;
                this.Apply();
            },
            /*BoxingRingOrbit.ResetView end.*/

            /*BoxingRingOrbit.OverUI start.*/
            OverUI: function () {
                return UnityEngine.MonoBehaviour.op_Inequality(UnityEngine.EventSystems.EventSystem.current, null) && UnityEngine.EventSystems.EventSystem.current.IsPointerOverGameObject();
            },
            /*BoxingRingOrbit.OverUI end.*/

            /*BoxingRingOrbit.LateUpdate start.*/
            LateUpdate: function () {
                if (UnityEngine.Screen.width !== this.lastW || UnityEngine.Screen.height !== this.lastH) {
                    this.ResetView();
                }

                var h = UnityEngine.Mathf.Max(1, UnityEngine.Screen.height);
                if (UnityEngine.Input.touchCount >= 2) {
                    this.dragging = false;
                    var d = (UnityEngine.Input.GetTouch(0).position.$clone().sub( UnityEngine.Input.GetTouch(1).position )).length();
                    if (this.lastPinch > 0.0 && d > 0.0) {
                        this.scale *= this.lastPinch / d;
                    }
                    this.lastPinch = d;
                } else {
                    this.lastPinch = 0.0;
                    if (UnityEngine.Input.GetMouseButtonDown(0)) {
                        this.dragging = !this.OverUI();
                        this.lastMouse = UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition.$clone());
                    }
                    if (UnityEngine.Input.GetMouseButtonUp(0)) {
                        this.dragging = false;
                    }
                    if (this.dragging && UnityEngine.Input.GetMouseButton(0)) {
                        var m = UnityEngine.Vector2.FromVector3(UnityEngine.Input.mousePosition.$clone());
                        var delta = m.$clone().sub( this.lastMouse );
                        this.lastMouse = m.$clone();
                        this.dTheta -= 6.28318548 * delta.x / h;
                        this.dPhi += 6.28318548 * delta.y / h;
                    }
                }
                var wheel = UnityEngine.Input.mouseScrollDelta.y;
                if (wheel > 0.0) {
                    this.scale *= 0.95;
                } else {
                    if (wheel < 0.0) {
                        this.scale /= 0.95;
                    }
                }

                var k = 1.0 - Math.pow(1.0 - this.dampingFactor, UnityEngine.Time.deltaTime * 60.0);
                this.theta += this.dTheta * k;
                this.phi += this.dPhi * k;
                this.dTheta *= (1.0 - k);
                this.dPhi *= (1.0 - k);
                this.Apply();
            },
            /*BoxingRingOrbit.LateUpdate end.*/

            /*BoxingRingOrbit.Apply start.*/
            Apply: function () {
                this.phi = Math.max(0.0001, Math.min(this.phi, UnityEngine.Mathf.Min(3.14149284, this.maxPolarAngle)));
                this.radius = Math.max(this.minDistance, Math.min(this.radius * this.scale, this.maxDistance));
                this.scale = 1.0;
                var s = Math.sin(this.phi);
                var off = new pc.Vec3( this.radius * s * Math.sin(this.theta), this.radius * Math.cos(this.phi), this.radius * s * Math.cos(this.theta) );
                this.transform.position = this.target.$clone().add( off );
                this.transform.LookAt$3(this.target, pc.Vec3.UP.clone());
            },
            /*BoxingRingOrbit.Apply end.*/


        }
    });
    /*BoxingRingOrbit end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    Bridge.define("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*LunaController start.*/
    Bridge.define("LunaController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            clickCount: 0,
            endTime: 0,
            bgm: null,
            musicSource: null,
            transparentCta: null,
            clicks: 0,
            remainingTime: 0,
            gameEnded: false,
            IsCtaReady: false
        },
        ctors: {
            init: function () {
                this.clickCount = 3;
                this.endTime = 20.0;
            }
        },
        methods: {
            /*LunaController.Awake start.*/
            Awake: function () {
                this.remainingTime = this.endTime;
                this.transparentCta.gameObject.SetActive(false);

                this.musicSource.clip = this.bgm;
            },
            /*LunaController.Awake end.*/

            /*LunaController.Start start.*/
            Start: function () {
                Luna.Unity.LifeCycle.GameStarted();
            },
            /*LunaController.Start end.*/

            /*LunaController.Update start.*/
            Update: function () {
                if (this.IsCtaReady || this.gameEnded) {
                    return;
                }
                this.remainingTime -= UnityEngine.Time.unscaledDeltaTime;
                if (this.remainingTime <= 0.0) {
                    this.EnableCta();
                }
            },
            /*LunaController.Update end.*/

            /*LunaController.RegisterClick start.*/
            RegisterClick: function () {
                if (this.IsCtaReady || this.gameEnded) {
                    return;
                }
                this.clicks = (this.clicks + 1) | 0;
                if (this.clicks === 1 && this.musicSource.clip != null) {
                    this.musicSource.Play();
                }
                if (this.clicks >= this.clickCount) {
                    this.EnableCta();
                }
            },
            /*LunaController.RegisterClick end.*/

            /*LunaController.EnableCta start.*/
            EnableCta: function () {
                this.IsCtaReady = true;
                this.transparentCta.gameObject.SetActive(true);
            },
            /*LunaController.EnableCta end.*/

            /*LunaController.OpenCta start.*/
            OpenCta: function () {
                if (!this.gameEnded) {
                    this.gameEnded = true;
                    if (!this.IsCtaReady) {
                        this.EnableCta();
                    }
                    Luna.Unity.LifeCycle.GameEnded();
                }
                Luna.Unity.Playable.InstallFullGame();
            },
            /*LunaController.OpenCta end.*/


        }
    });
    /*LunaController end.*/

    if ( MODULE_reflection ) {
    var $m = Bridge.setMetadata,
        $n = ["System","UnityEngine","System.Collections","UnityEngine.UI","System.Collections.Generic"];

    /*BoxingRingGame start.*/
    $m("BoxingRingGame", function () { return {"nested":[BoxingRingGame.Ease,BoxingRingGame.Particle],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"AnimateCritters","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"AnimateCritters","rt":$n[0].Void,"p":[$n[0].Single]},{"a":1,"n":"AnimateUI","t":8,"sn":"AnimateUI","rt":$n[0].Void},{"a":1,"n":"ApplyLayout","t":8,"pi":[{"n":"landscape","pt":$n[0].Boolean,"ps":0}],"sn":"ApplyLayout","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"Back","is":true,"t":8,"pi":[{"n":"p","pt":$n[0].Single,"ps":0},{"n":"o","pt":$n[0].Single,"ps":1}],"sn":"Back","rt":$n[0].Single,"p":[$n[0].Single,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Bounce","t":8,"pi":[{"n":"t","pt":$n[1].Transform,"ps":0},{"n":"peak","pt":$n[0].Single,"ps":1},{"n":"dur","pt":$n[0].Single,"ps":2},{"n":"halves","pt":$n[0].Int32,"ps":3}],"sn":"Bounce","rt":$n[2].IEnumerator,"p":[$n[1].Transform,$n[0].Single,$n[0].Single,$n[0].Int32]},{"a":1,"n":"BuildTarget","t":8,"sn":"BuildTarget","rt":$n[1].Vector3},{"a":1,"n":"CreateInstructionLayers","t":8,"sn":"CreateInstructionLayers","rt":$n[0].Void},{"a":1,"n":"CreateParticle","t":8,"sn":"CreateParticle","rt":BoxingRingGame.Particle},{"a":1,"n":"Elastic","is":true,"t":8,"pi":[{"n":"p","pt":$n[0].Single,"ps":0},{"n":"amplitude","pt":$n[0].Single,"ps":1},{"n":"period","pt":$n[0].Single,"ps":2}],"sn":"Elastic","rt":$n[0].Single,"p":[$n[0].Single,$n[0].Single,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"Evaluate","is":true,"t":8,"pi":[{"n":"ease","pt":BoxingRingGame.Ease,"ps":0},{"n":"p","pt":$n[0].Single,"ps":1}],"sn":"Evaluate","rt":$n[0].Single,"p":[BoxingRingGame.Ease,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"HandleTap","t":8,"sn":"HandleTap","rt":$n[0].Void},{"a":1,"n":"HitsBuildGrid","t":8,"pi":[{"n":"screenPoint","pt":$n[1].Vector2,"ps":0}],"sn":"HitsBuildGrid","rt":$n[0].Boolean,"p":[$n[1].Vector2],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":2,"n":"OnPlayClicked","t":8,"sn":"OnPlayClicked","rt":$n[0].Void},{"a":1,"n":"Payoff","t":8,"sn":"Payoff","rt":$n[2].IEnumerator},{"a":1,"n":"PlayTapSound","t":8,"pi":[{"n":"i","pt":$n[0].Int32,"ps":0}],"sn":"PlayTapSound","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"Scale","t":8,"pi":[{"n":"t","pt":$n[1].Transform,"ps":0},{"n":"from","pt":$n[1].Vector3,"ps":1},{"n":"to","pt":$n[1].Vector3,"ps":2},{"n":"dur","pt":$n[0].Single,"ps":3},{"n":"ease","pt":BoxingRingGame.Ease,"ps":4},{"n":"delay","pt":$n[0].Single,"ps":5}],"sn":"Scale","rt":$n[2].IEnumerator,"p":[$n[1].Transform,$n[1].Vector3,$n[1].Vector3,$n[0].Single,BoxingRingGame.Ease,$n[0].Single]},{"a":1,"n":"SetInstruction","t":8,"pi":[{"n":"text","pt":$n[0].String,"ps":0}],"sn":"SetInstruction","rt":$n[0].Void,"p":[$n[0].String]},{"a":1,"n":"ShowCta","t":8,"sn":"ShowCta","rt":$n[2].IEnumerator},{"a":1,"n":"SpawnParticles","t":8,"pi":[{"n":"at","pt":$n[1].Vector3,"ps":0}],"sn":"SpawnParticles","rt":$n[0].Void,"p":[$n[1].Vector3]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateParticles","t":8,"pi":[{"n":"dt","pt":$n[0].Single,"ps":0}],"sn":"UpdateParticles","rt":$n[0].Void,"p":[$n[0].Single]},{"a":2,"n":"bushes","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"bushes"},{"at":[new UnityEngine.HeaderAttribute("Scene")],"a":2,"n":"cam","t":4,"rt":$n[1].Camera,"sn":"cam"},{"a":1,"n":"clock","t":4,"rt":$n[0].Single,"sn":"clock","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"critterBaseY","t":4,"rt":$n[0].Array.type(System.Single),"sn":"critterBaseY"},{"a":2,"n":"critters","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"critters"},{"a":2,"n":"cssPx","t":4,"rt":$n[0].Single,"sn":"cssPx","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"cta","t":4,"rt":$n[1].RectTransform,"sn":"cta"},{"a":1,"n":"ctaBase","t":4,"rt":$n[1].Vector2,"sn":"ctaBase"},{"a":2,"n":"ctaGroup","t":4,"rt":$n[1].CanvasGroup,"sn":"ctaGroup"},{"a":1,"n":"downPos","t":4,"rt":$n[1].Vector2,"sn":"downPos"},{"a":1,"n":"downValid","t":4,"rt":$n[0].Boolean,"sn":"downValid","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"fighters","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"fighters"},{"a":2,"n":"friend","t":4,"rt":$n[1].Transform,"sn":"friend"},{"a":2,"n":"friendScale","t":4,"rt":$n[0].Single,"sn":"friendScale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"hand","t":4,"rt":$n[1].RectTransform,"sn":"hand"},{"a":2,"n":"handGroup","t":4,"rt":$n[1].CanvasGroup,"sn":"handGroup"},{"a":1,"n":"happy","t":4,"rt":$n[0].Boolean,"sn":"happy","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("FX")],"a":2,"n":"heartSprite","t":4,"rt":$n[1].Sprite,"sn":"heartSprite"},{"a":1,"n":"instrBase","t":4,"rt":$n[1].Vector2,"sn":"instrBase"},{"at":[new UnityEngine.HeaderAttribute("UI")],"a":2,"n":"instruction","t":4,"rt":$n[3].Text,"sn":"instruction"},{"a":1,"n":"instructionLayers","t":4,"rt":System.Array.type(UnityEngine.UI.Text),"sn":"instructionLayers"},{"a":2,"n":"keepText","t":4,"rt":$n[0].String,"sn":"keepText"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"landscapePlayButton","t":4,"rt":$n[1].RectTransform,"sn":"landscapePlayButton"},{"a":1,"n":"live","t":4,"rt":$n[4].List$1(BoxingRingGame.Particle),"sn":"live","ro":true},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"lunaController","t":4,"rt":LunaController,"sn":"lunaController"},{"a":2,"n":"parts","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"parts"},{"a":2,"n":"placeholder","t":4,"rt":$n[1].GameObject,"sn":"placeholder"},{"a":2,"n":"playButton","t":4,"rt":$n[1].RectTransform,"sn":"playButton"},{"a":1,"n":"pool","t":4,"rt":$n[4].Stack$1(BoxingRingGame.Particle),"sn":"pool","ro":true},{"a":2,"n":"ringRoot","t":4,"rt":$n[1].Transform,"sn":"ringRoot"},{"a":2,"n":"sfx","t":4,"rt":$n[1].AudioSource,"sn":"sfx"},{"a":1,"n":"stage","t":4,"rt":$n[0].Int32,"sn":"stage","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"startText","t":4,"rt":$n[0].String,"sn":"startText"},{"a":2,"n":"tapClips","t":4,"rt":System.Array.type(UnityEngine.AudioClip),"sn":"tapClips"},{"a":2,"n":"trees","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"trees"}]}; }, $n);
    /*BoxingRingGame end.*/

    /*BoxingRingGame+Ease start.*/
    $m("BoxingRingGame.Ease", function () { return {"td":BoxingRingGame,"att":258,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"BackOut15","is":true,"t":4,"rt":BoxingRingGame.Ease,"sn":"BackOut15","box":function ($v) { return Bridge.box($v, BoxingRingGame.Ease, System.Enum.toStringFn(BoxingRingGame.Ease));}},{"a":2,"n":"BackOut17","is":true,"t":4,"rt":BoxingRingGame.Ease,"sn":"BackOut17","box":function ($v) { return Bridge.box($v, BoxingRingGame.Ease, System.Enum.toStringFn(BoxingRingGame.Ease));}},{"a":2,"n":"ElasticOut04","is":true,"t":4,"rt":BoxingRingGame.Ease,"sn":"ElasticOut04","box":function ($v) { return Bridge.box($v, BoxingRingGame.Ease, System.Enum.toStringFn(BoxingRingGame.Ease));}},{"a":2,"n":"ElasticOut05","is":true,"t":4,"rt":BoxingRingGame.Ease,"sn":"ElasticOut05","box":function ($v) { return Bridge.box($v, BoxingRingGame.Ease, System.Enum.toStringFn(BoxingRingGame.Ease));}},{"a":2,"n":"Linear","is":true,"t":4,"rt":BoxingRingGame.Ease,"sn":"Linear","box":function ($v) { return Bridge.box($v, BoxingRingGame.Ease, System.Enum.toStringFn(BoxingRingGame.Ease));}},{"a":2,"n":"Power1InOut","is":true,"t":4,"rt":BoxingRingGame.Ease,"sn":"Power1InOut","box":function ($v) { return Bridge.box($v, BoxingRingGame.Ease, System.Enum.toStringFn(BoxingRingGame.Ease));}}]}; }, $n);
    /*BoxingRingGame+Ease end.*/

    /*BoxingRingGame+Particle start.*/
    $m("BoxingRingGame.Particle", function () { return {"td":BoxingRingGame,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"life","t":4,"rt":$n[0].Single,"sn":"life","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"sr","t":4,"rt":$n[1].SpriteRenderer,"sn":"sr"},{"a":2,"n":"t","t":4,"rt":$n[1].Transform,"sn":"t"},{"a":2,"n":"v","t":4,"rt":$n[1].Vector3,"sn":"v"}]}; }, $n);
    /*BoxingRingGame+Particle end.*/

    /*BoxingRingOrbit start.*/
    $m("BoxingRingOrbit", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Apply","t":8,"sn":"Apply","rt":$n[0].Void},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[0].Void},{"a":1,"n":"OverUI","t":8,"sn":"OverUI","rt":$n[0].Boolean,"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"ResetView","t":8,"sn":"ResetView","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"dPhi","t":4,"rt":$n[0].Single,"sn":"dPhi","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"dTheta","t":4,"rt":$n[0].Single,"sn":"dTheta","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"dampingFactor","t":4,"rt":$n[0].Single,"sn":"dampingFactor","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"dragging","t":4,"rt":$n[0].Boolean,"sn":"dragging","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"landscapePosition","t":4,"rt":$n[1].Vector3,"sn":"landscapePosition"},{"a":1,"n":"lastH","t":4,"rt":$n[0].Int32,"sn":"lastH","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"lastMouse","t":4,"rt":$n[1].Vector2,"sn":"lastMouse"},{"a":1,"n":"lastPinch","t":4,"rt":$n[0].Single,"sn":"lastPinch","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"lastW","t":4,"rt":$n[0].Int32,"sn":"lastW","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"maxDistance","t":4,"rt":$n[0].Single,"sn":"maxDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"maxPolarAngle","t":4,"rt":$n[0].Single,"sn":"maxPolarAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"minDistance","t":4,"rt":$n[0].Single,"sn":"minDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"phi","t":4,"rt":$n[0].Single,"sn":"phi","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"portraitPosition","t":4,"rt":$n[1].Vector3,"sn":"portraitPosition"},{"a":1,"n":"radius","t":4,"rt":$n[0].Single,"sn":"radius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"scale","t":4,"rt":$n[0].Single,"sn":"scale","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"target","t":4,"rt":$n[1].Vector3,"sn":"target"},{"a":1,"n":"theta","t":4,"rt":$n[0].Single,"sn":"theta","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*BoxingRingOrbit end.*/

    /*LunaController start.*/
    $m("LunaController", function () { return {"att":1048833,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[0].Void},{"a":1,"n":"EnableCta","t":8,"sn":"EnableCta","rt":$n[0].Void},{"a":2,"n":"OpenCta","t":8,"sn":"OpenCta","rt":$n[0].Void},{"a":2,"n":"RegisterClick","t":8,"sn":"RegisterClick","rt":$n[0].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":2,"n":"IsCtaReady","t":16,"rt":$n[0].Boolean,"g":{"a":2,"n":"get_IsCtaReady","t":8,"rt":$n[0].Boolean,"fg":"IsCtaReady","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_IsCtaReady","t":8,"p":[$n[0].Boolean],"rt":$n[0].Void,"fs":"IsCtaReady"},"fn":"IsCtaReady"},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.LunaPlaygroundAssetAttribute("BGM", 2, "CTA")],"a":1,"n":"bgm","t":4,"rt":$n[1].AudioClip,"sn":"bgm"},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.LunaPlaygroundFieldAttribute("Click Count", 0, "CTA", false, null)],"a":1,"n":"clickCount","t":4,"rt":$n[0].Int32,"sn":"clickCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"clicks","t":4,"rt":$n[0].Int32,"sn":"clicks","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.LunaPlaygroundFieldAttribute("End Time (seconds)", 1, "CTA", false, null)],"a":1,"n":"endTime","t":4,"rt":$n[0].Single,"sn":"endTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"gameEnded","t":4,"rt":$n[0].Boolean,"sn":"gameEnded","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"musicSource","t":4,"rt":$n[1].AudioSource,"sn":"musicSource"},{"a":1,"n":"remainingTime","t":4,"rt":$n[0].Single,"sn":"remainingTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"transparentCta","t":4,"rt":$n[3].Button,"sn":"transparentCta"},{"a":1,"backing":true,"n":"<IsCtaReady>k__BackingField","t":4,"rt":$n[0].Boolean,"sn":"IsCtaReady","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*LunaController end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    $m("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; }, $n);
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    }});
