declare module Konva {

    var pixelRatio:number;
    var dragDistance:number;
    var isDragging:() => boolean;
    var isDragReady:() => boolean;
    var DD:any;

    export class Util {
        static getRandomColor():string;

        static getRGB(color:string):string;
    }

    export class Easings {
        static BackEaseIn():any;

        static BackEaseInOut():any;

        static BackEaseOut():any;

        static BounceEaseIn():any;

        static BounceEaseInOut():any;

        static BounceEaseOut():any;

        static EaseIn():any;

        static EaseInOut():any;

        static EaseOut():any;

        static ElasticEaseIn():any;

        static ElasticEaseInOut():any;

        static ElasticEaseOut():any;

        static Linear():any;

        static StrongEaseIn():any;

        static StrongEaseInOut():any;

        static StrongEaseOut():any;
    }

    class Filter {
    }

    export class Filters {
        static Blur(imageData:any):Filter;

        static Brighten(imageData:any):Filter;

        static Emboss(imageData:any):Filter;

        static Enhance(imageData:any):Filter;

        static Grayscale(imageData:any):Filter;

        static HSV(imageData:any):Filter;

        static Invert(imageData:any):Filter;

        static Mask(imageData:any):Filter;

        static Noise(imageData:any):Filter;

        static Pixelate(imageData:any):Filter;

        static Posterize(imageData:any):Filter;

        static RGB(imageData:any):Filter;

        static Sepia(imageData:any):Filter;

        static Solarize(imageData:any):Filter;

        static Threshold(imageData:any):Filter;
    }

    export class Animation {
        constructor(func:Function, layers?:Konva.ILayer[]);
        constructor(func:Function, layer?:Konva.ILayer);

        addLayer(layer:Konva.ILayer):boolean;

        getLayers():Konva.ILayer[];

        isRunning():boolean;

        setLayers(layers:Konva.ILayer[]):Animation;
        setLayers(layer:Konva.ILayer):Animation;

        start():Animation;

        stop():Animation;
    }

    interface NodeConfig {
        x?: number;
        y?: number;
        width? : number;
        height? : number;
        visible?: boolean;
        listening?: boolean;
        id?: string;
        name?: string;
        opacity?: Number;
        scale?: Vector2d;
        scaleX? : number;
        scaleY? : number;
        rotationDeg?: number;
        offset?: Vector2d;
        offsetX? : number;
        offsetY? : number;
        draggable?: boolean;
        dragBoundFunc?: Function;
    }

    interface SizeConfig {
        x? : number;
        y? : number;
        width? : number;
        height? : number;
    }

    interface ToDataURLConfig extends SizeConfig {
        callback : Function;
        mimeType? : string;
        quality? : number;
    }

    interface CacheConfig extends SizeConfig {
        drawBorder? : boolean;
    }

    interface ClearConfig extends SizeConfig {
    }

    var Node:{
        new  (config:NodeConfig): INode;
        create<T>(JSON:any, container?:HTMLElement) : T;
    };

    interface INode {
        blue() : number;
        blue(blue:number) : INode;
        brightness() : number;
        brightness(brightness:number) : INode;
        blurRadius() : number;
        blurRadius(radius:number) : INode;
        cache(config?:CacheConfig) : INode;
        clearCache() : INode;
        clear(bounds?:ClearConfig) : INode;
        clone(attrs?:NodeConfig): INode;
        destroy() : void;

        dragBoundFunc() : Function;
        dragBoundFunc(dragBoundFunc:Function) : INode;
        draggable() : boolean;
        draggable(draggable:boolean) : INode;
        draw() : INode;
        embossBlend() : boolean;
        embossBlend(embossBlend:boolean) : INode;
        embossDirection() : string;
        embossDirection(embossDirection:string) : INode;
        embossStrength() : number;
        embossStrength(level:number) : INode;
        embossWhiteLevel() : number;
        embossWhiteLevel(embossWhiteLevel:number) : INode;
        enhance() : number;
        enhance(enhance:number) : INode;
        filters() : Filter[];
        filters(filters:Filter) : INode;
        fire(eventType:string, evt?:any, bubble?:boolean) : INode;
        getAbsoluteOpacity(): number;
        getAbsolutePosition(): Vector2d;
        getAbsoluteTransform(): Transform;
        getAbsoluteZIndex(): number;
        getAncestors() : Collection;
        getAttr(attr:string): any;
        getAttrs(): NodeConfig;
        // CHECK
        getCanvas() : Canvas;
        getClassName() : string;
        getContext() : Context;
        getDepth() : number;
        getHeight() : number;
        getHitCanvas() : Canvas;
        getLayer() : ILayer;
        getParent() : IContainer;
        // CHECK
        getSize() : {
            width : number;
            height : number;
        };
        getStage() : IStage;
        getTransform() : Transform;
        getType() : String;
        getWidth() : number;
        getZIndex(): number;
        green() : number;
        green(green:number) : INode;
        height() : number;
        height(height:number) : INode;
        hide(): void;
        hue() : number;
        hue(hue:number) : INode;
        id() : string;
        id(id:string) : INode;
        isDragging(): boolean;
        isListening(): boolean;
        isVisible(): boolean;
        kaleidoscopeAngle() : number;
        kaleidoscopeAngle(kaleidoscopeAngle:number) : INode;
        kaleidoscopePower() : number;
        kaleidoscopePower(kaleidoscopePower:number) : INode;
        levels() : number;
        levels(levels:number) : INode;
        listening() : any;
        listening(listening:boolean) : INode;
        listening(listening:string) : INode;
        move(move:Vector2d) : INode;
        moveDown() : boolean;
        moveTo(newContainer:IContainer): INode;
        moveToBottom(): boolean;
        moveToTop(): boolean;
        moveUp(): boolean;
        name() : string;
        name(name:string) : INode;
        noise() : number;
        noise(noise:number) : INode;
        off(evtStr:string) : INode;
        offset() : Vector2d;
        offset(offset:Vector2d) : INode;
        offsetX() : number;
        offsetX(offsetX:number) : INode;
        offsetY() : number;
        offsetY(offsetY:number) : INode;
        on(evtStr:string, handler:Function) : INode;
        opacity() : number;
        opacity(opacity:number) : INode;
        pixelSize() : number;
        pixelSize(pixelSize:number) : INode;
        position() : Vector2d;
        position(position:Vector2d) : INode;
        red() : number;
        red(red:number) : INode;
        remove() : INode;
        rotate(theta:number) : INode;
        rotation() : number;
        rotation(rotation:number) : INode;
        saturation() : number;
        saturation(saturation:number) : INode;
        scale() : Vector2d;
        scale(scale:Vector2d) : INode;
        scaleX() : number;
        scaleX(scaleX:number) : INode;
        scaleY() : number;
        scaleY(scaleY:number) : INode;
        setAbsolutePosition(pos:Vector2d) : INode;
        setAttr(attr:string, val:any): INode;
        setAttrs(attrs:NodeConfig) : void;
        setId(id:string) : INode;
        setSize(size:any, width:number, height:number) : INode;
        setZIndex(zIndex:number): void;
        shouldDrawHit() : boolean;
        show() : INode;
        skew() : Vector2d;
        skew(skew:Vector2d) : INode;
        skewX() : number;
        skewX(skewX:number) : INode;
        skewY() : number;
        skewY(skewY:number) : INode;
        startDrag() : void;
        stopDrag() : void;
        threshold() : number;
        threshold(threshold:number) : INode;
        toDataURL(config:ToDataURLConfig) : string;
        toImage(config:ToDataURLConfig) : HTMLImageElement;
        toJSON() : string;
        toObject() : any;
        transformsEnabled() : string;
        transformsEnabled(transformsEnabled:string) : INode;
        value() : number;
        value(value:number) : INode;
        visible() : any;
        visible(visible:boolean) : INode;
        visible(visible:string) : INode;
        width() : number;
        width(width:number) : INode;
        x() : number;
        x(x:number) : INode;
        y() : number;
        y(y:number) : INode;
    }

    interface ContainerConfig extends NodeConfig {
        clearBeforeDraw?: boolean;
        clipFunc?: Function;
    }

    var Container:{
        new (params?:ContainerConfig): IContainer;
    };

    interface IContainer extends INode {
        add(child:INode): IContainer;
        getChildren(filterfunc?:Function) : Collection;
        clip(): SizeConfig;
        clip(clip:SizeConfig) : IContainer;
        clipHeight(): number;
        clipHeight(clipHeight:number) : IContainer;
        clipWidth(): number;
        clipWidth(clipWidth:number) : IContainer;
        clipX(): number;
        clipX(clipX:number) : IContainer;
        clipY(): number;
        clipY(clipY:number) : IContainer;
        destroyChildren() : void;
        find(selector?:string): Collection;
        getAllIntersections(pos:Vector2d): INode[];
        hasChildren() : boolean;
        removeChildren() : void;
    }

    interface ShapeConfig extends NodeConfig {
        fill?: string;
        fillRed?: number;
        fillGreen?: number;
        fillBlue?: number;
        fillPatternImage?: HTMLImageElement;
        fillPatternX?: number;
        fillPatternY?: number;
        fillPatternOffset?: Vector2d;
        fillPatternOffsetX?: number;
        fillPatternOffsetY?: number;
        fillPatternScale?: Vector2d;
        fillPatternScaleX?: number;
        fillPatternScaleY?: number;
        fillPatternRotation?: number;
        fillPatternRepeat?: string;
        fillLinearGradientStartPoint?: Vector2d;
        fillLinearGradientStartPointX?: number;
        fillLinearGradientStartPointY?: number;
        fillLinearGradientEndPoint? : Vector2d;
        fillLinearGradientEndPointX?: number;
        fillLinearGradientEndPointY?: number;
        fillLinearGradientColorStops?: string[];
        fillLinearRadialStartPoint?: Vector2d;
        fillLinearRadialStartPointX?: number;
        fillLinearRadialStartPointY?: number;
        fillLinearRadialEndPoint? : Vector2d;
        fillLinearRadialEndPointX?: number;
        fillLinearRadialEndPointY?: number;
        fillRadialGradientStartRadius?: number;
        fillRadialGradientEndRadius?: number;
        fillRadialGradientColorStops?: string[];
        fillEnabled?: boolean;
        fillPriority?: string;
        stroke?: string;
        strokeRed?: number;
        strokeGreen?: number;
        strokeBlue?: number;
        strokeWidth?: number;
        strokeScaleEnabled?: boolean;
        strokeEnabled?: boolean;
        lineJoin?: string;
        lineCap?: string;
        sceneFunc? : (con:Context) => void;
        hitFunc? : (con:Context) => void;
        drawFunc? : (con:Context) => void;
        shadowColor?: string;
        shadowColorRed?: number;
        shadowColorGreen?: number;
        shadowColorBlue?: number;
        shadowBlur?: number;
        shadowOffset? : Vector2d;
        shadowOffsetX? : number;
        shadowOffsetY? : number;
        shadowOpacity?: number;
        shadowEnabled?: boolean;
        dash?: number[];
        dashEnabled?: boolean;
    }

    var Shape:{
        new (ShapeConfig:ShapeConfig): IShape;
    };

    interface IShape extends INode {
        dash():number[];
        dash(dash:number[]):IShape;

        dashEnabled():boolean;
        dashEnabled(dashEnabled:boolean):IShape;

        drawHitFromCache(alphaThreshold:number):IShape;

        fill():string;
        fill(fill:string):IShape;

        fillBlue():number;
        fillBlue(fillBlue:number):IShape;

        fillEnabled():boolean;
        fillEnabled(fillEnabled:boolean):IShape;

        fillGreen():number;
        fillGreen(fillGreen:number):IShape;

        fillLinearGradientColorStops():string[];
        fillLinearGradientColorStops(colors:string[]):IShape;

        fillLinearGradientStartPoint():Vector2d;
        fillLinearGradientStartPoint(point:Vector2d):Vector2d;

        fillLinearGradientStartPointX():number;
        fillLinearGradientStartPointX(x:number):IShape;

        fillLinearGradientStartPointY():number;
        fillLinearGradientStartPointY(y:number):IShape;

        fillLinearGradientEndPoint():Vector2d;
        fillLinearGradientEndPoint(point:Vector2d):IShape;

        fillLinearGradientEndPointX():number;
        fillLinearGradientEndPointX(x:number):IShape;

        fillLinearGradientEndPointY():number;
        fillLinearGradientEndPointY(y:number):IShape;

        fillLinearRadialStartPoint():Vector2d;
        fillLinearRadialStartPoint(point:Vector2d):IShape;

        fillLinearRadialStartPointX():number;
        fillLinearRadialStartPointX(x:number):IShape;

        fillLinearRadialStartPointY():number;
        fillLinearRadialStartPointY(y:number):IShape;

        fillLinearRadialEndPoint():Vector2d;
        fillLinearRadialEndPoint(point:Vector2d):Vector2d;

        fillLinearRadialEndPointX():number;
        fillLinearRadialEndPointX(x:number):IShape;

        fillLinearRadialEndPointY():number;
        fillLinearRadialEndPointY(y:number):IShape;

        fillPatternImage():HTMLImageElement;
        fillPatternImage(image:HTMLImageElement):IShape;

        fillRadialGradientStartRadius():number;
        fillRadialGradientStartRadius(radius:number):IShape;

        fillRadialGradientEndRadius():number;
        fillRadialGradientEndRadius(radius:number):IShape;

        fillRadialGradientColorStops():string[];
        fillRadialGradientColorStops(color:string[]):IShape;

        fillPatternOffset():Vector2d;
        fillPatternOffset(offset:Vector2d):IShape;

        fillPatternOffsetX():number;
        fillPatternOffsetX(x:number):IShape;

        fillPatternOffsetY():number;
        fillPatternOffsetY(y:number):IShape;

        fillPatternRepeat():string;
        fillPatternRepeat(repeat:string):IShape;

        fillPatternRotation():number;
        fillPatternRotation(rotation:number):IShape;

        fillPatternScale():Vector2d;
        fillPatternScale(scale:Vector2d):IShape;

        fillPatternScaleX():number;
        fillPatternScaleX(x:number):IShape;

        fillPatternScaleY():number;
        fillPatternScaleY(y:number):IShape;

        fillPatternX():number;
        fillPatternX(x:number):number;

        fillPatternY():number;
        fillPatternY(y:number):IShape;

        fillPriority():string;
        fillPriority(priority:string):IShape;

        fillRed():number;
        fillRed(fillRed:number):IShape;

        hasFill():boolean;

        hasShadow():boolean;

        hasStroke():boolean;

        hitFunc():Function;
        hitFunc(func:Function):IShape;

        intersects(point:Vector2d):boolean;

        lineCap():string;
        lineCap(lineCap:string):IShape;

        lineJoin():string;
        lineJoin(lineJoin:string):IShape;

        sceneFunc():Function;
        sceneFunc(func:(con:Context) => {}):IShape;

        shadowBlue():number;
        shadowBlue(shadowBlue:number):IShape;

        shadowColor():string;
        shadowColor(shadowColor:string):IShape;

        shadowEnabled():boolean;
        shadowEnabled(shadowEnabled:boolean):IShape;

        shadowGreen():number;
        shadowGreen(shadowGreen:number):IShape;

        shadowOffset():Vector2d;
        shadowOffset(shadowOffset:Vector2d):IShape;

        shadowOffsetX():number;
        shadowOffsetX(shadowOffsetX:number):IShape;

        shadowOffsetY():number;
        shadowOffsetY(shadowOffsetY:number):IShape;

        shadowOpacity():number;
        shadowOpacity(shadowOpacity:number):IShape;

        shadowRed():number;
        shadowRed(shadowRed:number):IShape;

        stroke():string;
        stroke(stroke:string):IShape;

        strokeBlue():number;
        strokeBlue(strokeBlue:number):IShape;

        strokeRed():number;
        strokeRed(strokeRed:number):IShape;

        strokeGreen():number;
        strokeGreen(strokeGreen:number):IShape;

        strokeEnabled():boolean;
        strokeEnabled(strokeEnabled:boolean):IShape;

        strokeScaleEnabled():boolean;
        strokeScaleEnabled(strokeScaleEnabled:boolean):IShape;

        strokeHitEnabled():boolean;
        strokeHitEnabled(strokeHitEnabled:boolean):IShape;

        strokeWidth():number;
        strokeWidth(strokeWidth:number):IShape;
    }

    interface StageConfig extends ContainerConfig {
        container: any;
    }

    var Stage:{
        new (StageConfig:StageConfig): IStage;
    };


    interface IStage extends IContainer {
        addLayer(layer:ILayer):IStage;

        batchDraw():void;

        container():HTMLElement;

        destroy():void;

        drawHit():void;

        getIntersection(pos:Vector2d):IShape;

        getLayers():ILayer[];

        getPointerPosition():Vector2d;

        setContainer(con:HTMLElement):void;

        setHeight(height:number):void;

        setWidth(width:number):void;
    }

    interface LayerConfig extends ContainerConfig {
        clearBeforeDraw?: boolean;
    }

    var Layer:{
        new (config?:LayerConfig): ILayer;

    };

    interface ILayer extends IContainer {
        getIntersection(pos:Vector2d):IShape;

        enableHitGraph():ILayer;

        disableHitGraph():ILayer;

        clearBeforeDraw():boolean;
        clearBeforeDraw(val:boolean):ILayer;

        hitGraphEnabled():boolean;
        hitGraphEnabled(val:boolean):ILayer;

        batchDraw():void;

        drawScene():void;
    }


    var Group:{
        new (ContainerConfig:ContainerConfig): IGroup;
    };

    interface IGroup extends IContainer {

    }

    interface CanvasConfig {
        width: number;
        height: number;
        pixelRatio: number;
    }

    class Canvas {
        constructor(CanvasConfig:CanvasConfig);

        getContext():CanvasRenderingContext2D;

        getHeight():number;

        getWidth():number;

        getPixelRation():number;

        setHeight(val:number):void;

        setWidth(val:number):void ;

        setPixelRation(val:number):void;

        setSize(size:{width:number; height: number}):void;

        toDataURL(mimeType:string, quality:number):string;

        public _canvas:HTMLElement;
    }

    class Context {
        clear(bounds?:ClearConfig):Context;

        clearTrace():void;

        fillShape(shape:IShape):void;

        fillStrokeShape(shape:IShape):void;

        getCanvas():Konva.Canvas;

        getTrace(relaxed:boolean):string;

        reset():void;

        moveTo(x:number, y:number):void;

        lineTo(x:number, y:number):void;

        beginPath():void;

        setAttr(attr:string, value:any):void;

        closePath():void;

        strokeShape(shape:IShape):void;
    }

    class Tween {
        constructor(params:any);

        destroy():void;

        finish():Tween;

        pause():Tween;

        play():Tween;

        reset():Tween;

        reverse():Tween;

        seek(t:number):Tween;
    }

    // Shapes

    interface RingConfig extends ShapeConfig {
        innerRadius: number;
        outerRadius: number;
        clockwise?: boolean;
    }

    var Ring:{
        new (RingConfig:RingConfig): IRing;
    };

    interface IRing extends IShape {
        angle():number;
        angle(angle:number):IRing;

        innerRadius():number;
        innerRadius(innerRadius:number):IRing;

        outerRadius():number;
        outerRadius(outerRadius:number):IRing;
    }

    interface ArcConfig extends RingConfig {
        angle: number;
    }

    var Arc:{
        new (ArcConfig:ArcConfig): IArc;
    };

    interface IArc extends IShape {
        clockwise():boolean;
        clockwise(clockwise:boolean):IArc;
    }

    interface CircleConfig extends ShapeConfig {
        radius: number;
    }

    var Circle:{
        new (CircleConfig:CircleConfig): ICircle;
    };

    interface ICircle extends IShape {
        radius():number;
        radius(radius:number):ICircle;
    }

    interface EllipseConfig extends ShapeConfig {
        radius: any;
    }

    var Ellipse:{
        new (CircleConfig:CircleConfig): ICircle;
    };

    interface IEllipse extends IShape {

        radius():any;
        radius(radius:any):IEllipse;

        radiusX():number;
        radiusX(radiusX:number):IEllipse;

        radiusY():number;
        radiusY(radiusY:number):IEllipse;
    }

    interface ImageConfig extends ShapeConfig {
        image: HTMLImageElement;
        crop?: SizeConfig;
    }

    var Image:{
        new (ImageConfig:ImageConfig): IImage;
    };

    interface IImage extends IShape {

        image():HTMLImageElement;
        image(image:HTMLImageElement):IImage;

        crop():SizeConfig;
        crop(crop:SizeConfig):IImage;

        cropX():number;
        cropX(cropX:number):IImage;

        cropY():number;
        cropY(cropY:number):IImage;

        cropWidth():number;
        cropWidth(cropWidth:number):IImage;

        cropHeight():number;
        cropHeight(cropHeight:number):IImage;
    }

    interface LineConfig extends ShapeConfig {
        points: number[];
        tension?: number;
        closed?: boolean;
    }

    var Line:{
        new (LineConfig:LineConfig): ILine;
    };


    interface ILine extends IShape {
        closed():boolean;
        closed(closed:boolean):ILine;

        tension():number;
        tension(tension:number):ILine;

        points():number[];
        points(points:number[]):ILine;
    }

    interface RectConfig extends ShapeConfig {
        cornerRadius?: number;
    }

    var Rect:{
        new (RectConfig:RectConfig): IRect;
    };

    interface IRect extends IShape {
        cornerRadius():number;
        cornerRadius(cornerRadius:number):IRect;
    }

    interface SpriteConfig extends ShapeConfig {
        animation: string;
        animations: any;
        frameIndex?: number;
        image: HTMLImageElement;
    }

    var Sprite:{
        new (SpriteConfig:SpriteConfig): ISprite;
    };

    interface ISprite extends IShape {
        start():void;

        stop():void;

        animation():string;
        animation(val:string):ISprite;

        animations():any;
        animations(val:any):ISprite;

        frameIndex():number;
        frameIndex(val:number):ISprite;

        image():HTMLImageElement;
        image(image:HTMLImageElement):ISprite;

        frameRate():number;
        frameRate(frameRate:number):ISprite;
    }

    interface TextConfig extends ShapeConfig {
        text: string;
        fontFamily?: string;
        fontSize?: number;
        fontStyle?: string;
        align?: string;
        padding?: number;
        lineHeight?: number;
        wrap?: string;
    }

    var Text:{
        new (TextConfig:TextConfig): IText;
    };

    interface IText extends IShape {
        getTextWidth():number;

        getTextHeight():number;

        text():string;
        text(text:string):IText;

        fontFamily():string;
        fontFamily(fontFamily:string):IText;

        fontSize():number;
        fontSize(fontSize:number):IText;

        fontStyle():string;
        fontStyle(fontStyle:string):IText;

        align():string;
        align(align:string):IText;

        padding():number;
        padding(padding:number):IText;

        lineHeight():number;
        lineHeight(lineHeight:number):IText;

        wrap():string;
        wrap(wrap:string):IText;
    }

    interface WedgeConfig extends ShapeConfig {
        angle: number;
        radius: number;
        clockwise?: boolean;
    }

    var Wedge:{
        new (WedgeConfig:WedgeConfig): IWedge;
    };

    interface IWedge extends IShape {
        angle():number;
        angle(angle:number):IWedge;

        radius():number;
        radius(radius:number):IWedge;

        clockwise():boolean;
        clockwise(clockwise:boolean):IWedge;
    }

    // Plugins
    interface TagConfig extends ShapeConfig {
        pointerDirection?: string;
        pointerWidth?: number;
        pointerHeight?: number;
        cornerRadius?:number;
    }

    var Tag:{
        new (config:TagConfig): ITag;
    };

    interface ITag extends IShape {
        pointerDirection():string;
        pointerDirection(pointerDirection:string):ITag;

        pointerWidth():number;
        pointerWidth(pointerWidth:number):ITag;

        pointerHeight():number;
        pointerHeight(pointerHeight:number):ITag;

        cornerRadius():number;
        cornerRadius(cornerRadius:number):ITag;
    }


    interface LabelInterface extends ContainerConfig {
    }

    var Label:{
        new (LabelInterface:LabelInterface): ILabel;
    };

    interface ILabel extends IGroup {
        getText():IText;

        getTag():IRect;
    }

    interface PathConfig extends ShapeConfig {
        data: string;
    }

    var Path:{
        new (PathConfig:PathConfig): IPath;
    };

    interface IPath extends IShape {
        data():string;
        data(data:string):IPath;
    }

    interface RegularPolygonConfig extends ShapeConfig {
        sides: number;
        radius: number;
    }

    var RegularPolygon:{
        new (RegularPolygonConfig:RegularPolygonConfig): IRegularPolygon;
    };

    interface IRegularPolygon extends IShape {
        sides():number;
        sides(sides:number):IRegularPolygon;

        radius():number;
        radius(radius:number):IRegularPolygon;
    }

    interface StarConfig extends ShapeConfig {
        numPoints: number;
        innerRadius: number;
        outerRadius: number;
    }

    var Star:{
        new (StarConfig:StarConfig): IStar;
    };

    interface IStar extends IShape {
        numPoints():number;
        numPoints(numPoints:number):IStar;

        innerRadius():number;
        innerRadius(innerRadius:number):IStar;

        outerRadius():number;
        outerRadius(outerRadius:number):IStar;
    }

    interface TextPathConfig extends ShapeConfig {
        text: string;
        data: string;
        fontFamily?: string;
        fontSize?: number;
        fontStyle?: string;
    }

    var TextPath:{
        new (TextPathConfig:TextPathConfig): ITextPath;
    };

    interface ITextPath extends IShape {
        getTextWidth():number;

        getTextHeight():number;

        setText(text:string):void;

        text():string;
        text(text:string):IPath;

        fontFamily():string;
        fontFamily(fontFamily:string):IPath;

        fontSize():number;
        fontSize(fontSize:number):IPath;

        fontStyle():string;
        fontStyle(fontStyle:string):IPath;
    }


    class Collection {
    [i : number] : any;
        static toCollection(arr:any[]):Collection;

        each(f:(el:Konva.INode) => void):void;

        toArray():any[];

        length:number;
    }

    class Transform {
        getMatrix():any[];

        getTranslation():Vector2d;

        invert():void;

        multiply(matrix:any[]):void;

        rotate(deg:number):void;

        scale(x:number, y:Number):void;

        setAbsolutePosition():void;

        skew(x:number, y:Number):void;

        translate(x:number, y:Number):void;
    }


    interface Vector2d {
        x: number;
        y: number;
    }

}

declare module "konva" {
    export = Konva;
}