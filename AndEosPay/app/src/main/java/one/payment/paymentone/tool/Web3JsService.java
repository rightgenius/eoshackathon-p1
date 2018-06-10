package one.payment.paymentone.tool;

import android.app.Activity;
import android.webkit.JavascriptInterface;

import com.google.zxing.integration.android.IntentIntegrator;

import java.lang.ref.WeakReference;

/**
 * Created by kris on 2018/4/19.
 */

public class Web3JsService {
    WeakReference<Activity> actRef;

    Integer scanReq;
    public Web3JsService(Activity act, Integer scanReq) {
        actRef = new WeakReference<>(act);
        this.scanReq = scanReq;
    }


    @JavascriptInterface
    public void scan() {
            IntentIntegrator integrator = new IntentIntegrator(actRef.get());
            integrator.setPrompt("扫码");
            integrator.setRequestCode(scanReq);
            integrator.setOrientationLocked(false);
            integrator.initiateScan();
    }



}
