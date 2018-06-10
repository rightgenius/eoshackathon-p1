package one.payment.paymentone;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.widget.ProgressBar;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import one.payment.paymentone.tool.Web3JsService;
import one.payment.paymentone.tool.Web3WebView;

public class MainActivity extends AppCompatActivity {
    public static final int BARCODE_READER_REQUEST_CODE = 1;
    Web3WebView web3WebView;
    ProgressBar progressBar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        web3WebView = (Web3WebView) findViewById(R.id.dapp_web_view);
        progressBar = (ProgressBar) findViewById(R.id.progress_bar);
        web3WebView.setFocusable(true);
        web3WebView.setFocusableInTouchMode(true);
        web3WebView.requestFocus();
        web3WebView.requestFocusFromTouch();
        web3WebView.getSettings().setUserAgentString("WorldCupApp");
        if (android.os.Build.VERSION.SDK_INT >= 19) {
            web3WebView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        }
        web3WebView.setProgressChangedListener(progress -> {
            if (progress == 100) {
                progressBar.setVisibility(View.GONE);
            } else {
                if (progressBar.getVisibility() == View.GONE)
                    progressBar.setVisibility(View.VISIBLE);
                progressBar.setProgress(progress);
            }
        });
        Web3JsService s = new Web3JsService(this, BARCODE_READER_REQUEST_CODE);
        web3WebView.addJavascriptInterface(s, "eosWVJs");
//        web3WebView.loadUrl("http://10.101.1.49:8080/#/");
        web3WebView.loadUrl("file:///android_asset/index.html");
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == BARCODE_READER_REQUEST_CODE) {

            IntentResult result = IntentIntegrator.parseActivityResult(resultCode, data);
            if (result.getContents() == null) {
                Log.e("SEND", "null");
            } else {
                Log.e("SEND", "getBarCode ： " + result.getContents());
                onScanResult(result.getContents());
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    @SuppressLint("NewApi")
    private void onScanResult(String result) {

        final int version = android.os.Build.VERSION.SDK_INT;
// 因为该方法在 Android 4.4 版本才可使用，所以使用时需进行版本判断
        if (version < 18) {
            web3WebView.loadUrl("javascript:setScanResult(\"" + result + "\")");
        } else {
            web3WebView.evaluateJavascript("javascript:setScanResult(\"" + result +"\")", value -> {
            });
        }
    }


}
