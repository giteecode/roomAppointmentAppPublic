package com.company.project.model;

import java.awt.*;

/**
 * @ClassName QrcodeFont
 * @Description //TODO
 * @Author cjm
 * @Date 2020/7/23 10:49
 * @Version 1.0
 **/
public class QrCodeFont {

    private int startX;//文字显示x坐标
    private int startY;//文字显示y坐标
    private String text;//显示的文字内容
    private int fontSize = 26;//字体大小
    private int fontStyle = Font.PLAIN;//字体风格
    private Color color = Color.black;//文字显示颜色 #333333

    public QrCodeFont(String text) {
        this.text = text;
    }

    public int getStartX() {
        return startX;
    }

    public void setStartX(int startX) {
        this.startX = startX;
    }

    public int getStartY() {
        return startY;
    }

    public void setStartY(int startY) {
        this.startY = startY;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getFontSize() {
        return fontSize;
    }

    public void setFontSize(int fontSize) {
        this.fontSize = fontSize;
    }

    public int getFontStyle() {
        return fontStyle;
    }

    public void setFontStyle(int fontStyle) {
        this.fontStyle = fontStyle;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }
}
