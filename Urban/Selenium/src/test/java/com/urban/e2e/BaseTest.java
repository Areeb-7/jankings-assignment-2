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

        setupChromeDriver();
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

    private void setupChromeDriver() {
        boolean customDriverSet = false;
        try {
            // 1. Get Google Chrome version on macOS
            String[] command = {"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "--version"};
            Process process = Runtime.getRuntime().exec(command);
            java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
            String versionLine = reader.readLine();
            process.waitFor();
            if (versionLine != null && versionLine.contains("Google Chrome")) {
                String version = versionLine.replaceAll("[^0-9.]", "").trim();
                String majorVersion = version.split("\\.")[0];
                
                // 2. Search in ~/.cache/selenium/chromedriver
                String userHome = System.getProperty("user.home");
                File cacheDir = new File(userHome + "/.cache/selenium/chromedriver");
                if (cacheDir.exists() && cacheDir.isDirectory()) {
                    File match = findDriverForVersion(cacheDir, majorVersion);
                    if (match != null) {
                        System.setProperty("webdriver.chrome.driver", match.getAbsolutePath());
                        System.out.println("Set system property webdriver.chrome.driver to: " + match.getAbsolutePath());
                        customDriverSet = true;
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Could not resolve local ChromeDriver path dynamically: " + e.getMessage());
        }

        if (!customDriverSet) {
            WebDriverManager.chromedriver().setup();
        }
    }

    private File findDriverForVersion(File dir, String majorVersion) {
        File[] files = dir.listFiles();
        if (files == null) return null;
        for (File f : files) {
            if (f.isDirectory()) {
                if (f.getName().startsWith(majorVersion + ".")) {
                    File driverBin = findExecutable(f, "chromedriver");
                    if (driverBin != null) return driverBin;
                }
                File driverBin = findDriverForVersion(f, majorVersion);
                if (driverBin != null) return driverBin;
            }
        }
        return null;
    }

    private File findExecutable(File dir, String name) {
        File[] files = dir.listFiles();
        if (files == null) return null;
        for (File f : files) {
            if (f.isFile() && f.getName().equals(name) && f.canExecute()) {
                return f;
            } else if (f.isDirectory()) {
                File res = findExecutable(f, name);
                if (res != null) return res;
            }
        }
        return null;
    }

    @AfterClass(alwaysRun = true)
    public void tearDown() {
        if (driver != null) {
            try {
                Thread.sleep(3000); // Keep screen open for 3 seconds after test completion
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
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

    public static void typeSlowly(org.openqa.selenium.WebElement element, String text) {
        element.clear();
        for (char c : text.toCharArray()) {
            element.sendKeys(String.valueOf(c));
            try {
                Thread.sleep(20); // 20ms typing delay per character
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void delay(long millis) {
        try {
            Thread.sleep(Math.max(10, millis / 5)); // Scale down delays for faster execution
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
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
