package cn.toside.music.mobile.lyric;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class LyricModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  Lyric lyric;
  // final Map<String, Object> constants = new HashMap<>();

  boolean isShowTranslation = false;
  boolean isShowRoma = false;

  LyricModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    // constants.put("THEME_GREEN", "#07c556");
    // constants.put("THEME_YELLOW", "#fffa12");
    // constants.put("THEME_BLUE", "#19b5fe");
    // constants.put("THEME_RED", "#ff1222");
    // constants.put("THEME_PINK", "#f1828d");
    // constants.put("THEME_PURPLE", "#c851d4");
    // constants.put("THEME_ORANGE", "#fffa12");
    // constants.put("THEME_GREY", "#bdc3c7");
  }

  @Override
  public String getName() {
    return "LyricModule";
  }

//  @Override
//  public Map<String, Object> getConstants() {
//    return constants;
//  }

  @ReactMethod
  public void showLyric(ReadableMap data, Promise promise) {
    if (lyric == null) lyric = new Lyric(reactContext, isShowTranslation, isShowRoma);
    lyric.showLyric(Arguments.toBundle(data), promise);
  }

  @ReactMethod
  public void hideLyric(Promise promise) {
    if (lyric != null) lyric.hideLyric();
    promise.resolve(null);
  }


  @ReactMethod
  public void setLyric(String lyric, String translation, String romaLyric, Promise promise) {
    // Log.d("Lyric", "set lyric: " + lyric);
    // Log.d("Lyric", "set lyric translation: " + translation);
    if (lyric != null) this.lyric.setLyric(lyric, translation, romaLyric);
    promise.resolve(null);
  }

  @ReactMethod
  public void toggleTranslation(boolean isShowTranslation, Promise promise) {
    this.isShowTranslation = isShowTranslation;
    if (lyric != null) lyric.toggleTranslation(isShowTranslation);
    promise.resolve(null);
  }

  @ReactMethod
  public void toggleRoma(boolean isShowRoma, Promise promise) {
    this.isShowRoma = isShowRoma;
    if (lyric != null) lyric.toggleRoma(isShowRoma);
    promise.resolve(null);
  }

  @ReactMethod
  public void play(int time, Promise promise) {
    Log.d("Lyric", "play lyric: " + time);
    if (lyric != null) lyric.play(time);
    promise.resolve(null);
  }

  @ReactMethod
  public void pause(Promise promise) {
    Log.d("Lyric", "play pause");
    if (lyric != null) lyric.pauseLyric();
    promise.resolve(null);
  }

  @ReactMethod
  public void toggleLock(boolean isLock, Promise promise) {
    if (lyric != null) {
      if (isLock) {
        lyric.lockLyric();
      } else {
        lyric.unlockLyric();
      }
    }
    promise.resolve(null);
  }

  @ReactMethod
  public void setColor(String themeColor, Promise promise) {
    if (lyric != null) lyric.setColor(themeColor);
    promise.resolve(null);
  }

  @ReactMethod
  public void setAlpha(float alpha, Promise promise) {
    if (lyric != null) lyric.setAlpha(alpha);
    promise.resolve(null);
  }

  @ReactMethod
  public void setTextSize(float size, Promise promise) {
    if (lyric != null) lyric.setTextSize(size);
    promise.resolve(null);
  }

  @ReactMethod
  public void setMaxLineNum(int maxLineNum, Promise promise) {
    if (lyric != null) lyric.setMaxLineNum(maxLineNum);
    promise.resolve(null);
  }

  @ReactMethod
  public void setSingleLine(boolean singleLine, Promise promise) {
    if (lyric != null) lyric.setSingleLine(singleLine);
    promise.resolve(null);
  }

  @ReactMethod
  public void setShowToggleAnima(boolean showToggleAnima, Promise promise) {
    if (lyric != null) lyric.setShowToggleAnima(showToggleAnima);
    promise.resolve(null);
  }

  @ReactMethod
  public void setWidth(int width, Promise promise) {
    if (lyric != null) lyric.setWidth(width);
    promise.resolve(null);
  }

  @ReactMethod
  public void setLyricTextPosition(String positionX, String positionY, Promise promise) {
    if (lyric != null) lyric.setLyricTextPosition(positionX, positionY);
    promise.resolve(null);
  }

  @ReactMethod
  public void checkOverlayPermission(Promise promise) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
      promise.reject(new Exception("Permission denied"));
    }
    promise.resolve(null);
  }

  @ReactMethod
  public void openOverlayPermissionActivity(Promise promise) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
      Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + reactContext.getApplicationContext().getPackageName()));
      reactContext.startActivityForResult(intent, 1, null);
    }
    promise.resolve(null);
  }

}
