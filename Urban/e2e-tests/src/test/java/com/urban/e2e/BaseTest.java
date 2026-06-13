package com.urban.e2e;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.ITestResult;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class BaseTest {
    protected WebDriver driver;
    protected String frontendUrl;
    protected String backendUrl;

    @BeforeClass(alwaysRun = true)
    public void setUp() {
        String f = System.getProperty("frontend.url");
        String b = System.getProperty("backend.url");
        frontendUrl = (f == null || f.trim().isEmpty()) ? "http://localhost:5173" : f;
        backendUrl = (b == null || b.trim().isEmpty()) ? "http://localhost:3010" : b;

        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        String headless = System.getProperty("headless", "false");
        if ("true".equalsIgnoreCase(headless)) {
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
        }
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--start-maximized");
        options.addArguments("--window-size=1280,800");
        driver = new ChromeDriver(options);
    }

    @AfterClass(alwaysRun = true)
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    protected boolean createUserViaApi(String name, String email, String password) {
        try {
            URL url = new URL(backendUrl + "/api/auth/register");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);
            String payload = String.format("{\"name\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}", name, email, password);
            try (OutputStream os = conn.getOutputStream()) {
                os.write(payload.getBytes());
            }
            int code = conn.getResponseCode();
            return code >= 200 && code < 300;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @AfterMethod(alwaysRun = true)
    public void captureFailureArtifacts(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE && driver != null) {
            try {
                String name = result.getMethod().getMethodName();
                String dir = System.getProperty("user.dir") + "/target/surefire-reports/failure-artifacts";
                Path dirPath = Paths.get(dir);
                Files.createDirectories(dirPath);

                // screenshot
                File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
                Path shotPath = dirPath.resolve(name + "-" + System.currentTimeMillis() + ".png");
                Files.copy(src.toPath(), shotPath);

                // page source
                String source = driver.getPageSource();
                Path srcPath = dirPath.resolve(name + "-" + System.currentTimeMillis() + ".html");
                Files.writeString(srcPath, source);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
