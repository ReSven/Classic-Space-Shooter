export default class CanvasRect {
    constructor() {}
    draw() {
      var fontsize = 14;
      var fontface = "verdana";
      var lineHeight = fontsize * 1.286;
      var text = "Draw a rectangle around me.";
  
      ctx.font = fontsize + "px " + fontface;
      var textWidth = ctx.measureText(text).width;
  
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
  
      ctx.fillText(text, 20, 50);
      ctx.strokeRect(20, 50, textWidth, lineHeight);
    }
  }
