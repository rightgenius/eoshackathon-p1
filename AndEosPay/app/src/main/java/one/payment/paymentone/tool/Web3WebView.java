package one.payment.paymentone.tool;

import android.content.Context;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.os.Build;
import android.os.Message;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.webkit.ConsoleMessage;
import android.webkit.CookieManager;
import android.webkit.JsResult;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by kris on 2018/4/19.
 */

public class Web3WebView extends WebView {
    Context mContext;


    ProgressChangedListener mProgressChangedListener;


    PageLoadedFinishCallback mPageLoadedFinishCallback;



    public Web3WebView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    public Web3WebView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public Web3WebView(Context context) {
        this(context, null);
    }

    public void setContext(Context context) {
        mContext = context;
    }

    private void init() {
        getSettings().setPluginState(WebSettings.PluginState.ON);

        getSettings().setJavaScriptEnabled(true);
        //缩放操作
        getSettings().setSupportZoom(true);//支持缩放，默认为true。是下面那个的前提。
        getSettings().setBuiltInZoomControls(true);//设置内置的缩放控件。若为false，则该WebView不可缩放
        getSettings().setDisplayZoomControls(false);//隐藏原生的缩放控件
        //设置自适应屏幕，两者合用
        getSettings().setUseWideViewPort(true);//将图片调整到适合webview的大小
        getSettings().setLoadWithOverviewMode(true);// 缩放至屏幕的大小
        // 解决中文乱码
        getSettings().setDefaultTextEncodingName("utf-8");

        getSettings().setSavePassword(false);
        getSettings().setJavaScriptCanOpenWindowsAutomatically(true);//支持通过JS打开新窗口

        CookieManager.getInstance().setAcceptCookie(true);

        //不加这句，Https中包含http的图片将无法显示
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }

        setWebViewClient(new CaptureWebViewClient());
        //设置为true时，就代表你想要你的WebView支持多窗口，但是一旦设置为true，必须要重写WebChromeClient的onCreateWindow方法。
        getSettings().setSupportMultipleWindows(true);
        setWebChromeClient(new CaptureChromeClient());


        //去除远程代码执行漏洞
        removeJavascriptInterface("searchBoxJavaBridge_");
        removeJavascriptInterface("accessibilityTraversal");
        removeJavascriptInterface("accessibility");

        getSettings().setAppCacheEnabled(true);//开启 Application Caches 功能
        getSettings().setAppCacheMaxSize(1024 * 1024 * 8);
//        String appCacheDir = mWebView.getContext().getApplicationContext().getDir("cache", Context.MODE_PRIVATE).getPath();
//        getSettings().setAppCachePath(appCacheDir);
        getSettings().setAllowFileAccess(true);

        getSettings().setDatabaseEnabled(true);//开启 database storage API 功能
        //不打开setDomStorageEnabled，有时候百度首页会打不开
        getSettings().setDomStorageEnabled(true);// 开启 DOM storage API 功能

        //webview只显示一列，也就是自适应页面大小 不能左右滑动
        getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        setVerticalScrollBarEnabled(false);//设置竖直滚动条  ，false表示禁止使用
        setVerticalScrollbarOverlay(false);
        setHorizontalScrollBarEnabled(false);//设置水平滚动条，true表示允许使用
        setHorizontalScrollbarOverlay(false);

    }


    public void setPageLoadedFinishCallback(PageLoadedFinishCallback callback) {
        this.mPageLoadedFinishCallback = callback;
    }

    public void setProgressChangedListener(ProgressChangedListener listener) {
        this.mProgressChangedListener = listener;
    }


    public interface ProgressChangedListener {
        void onProgressChanged(int progress);
    }


    public interface PageLoadedFinishCallback {
        void onPageLoaded(WebView webView, String url);
    }

    private class CaptureWebViewClient extends WebViewClient {
        @Override
        public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
            super.onReceivedSslError(view, handler, error);
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);

        }

        @Override
        public void onPageFinished(WebView view, String url) {
            if (mPageLoadedFinishCallback != null) {
                mPageLoadedFinishCallback.onPageLoaded(view, url);
            }
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            super.shouldOverrideUrlLoading(view, url);
            return false;
        }
    }

    private class CaptureChromeClient extends WebChromeClient {
        @Override
        public boolean onJsAlert(WebView view, String url, String message,
                                 JsResult result) {
            result.confirm();
            return true;
        }

        @Override
        public boolean onJsConfirm(WebView view, String url,
                                   String message, JsResult result) {
            result.confirm();
            return true;
        }

        @Override
        public boolean onConsoleMessage(ConsoleMessage cm) {
            return true;
        }

        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            if (mProgressChangedListener != null)
                mProgressChangedListener.onProgressChanged(newProgress);
            super.onProgressChanged(view, newProgress);
        }

        @Override
        public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
            return super.onCreateWindow(view, isDialog, isUserGesture, resultMsg);
        }
    }


    @Override
    public boolean onCheckIsTextEditor() {
        return true;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
            case MotionEvent.ACTION_UP:
                if (!hasFocus())
                    requestFocus();
                break;
        }

        return super.onTouchEvent(event);
    }


}
