# Urban E2E tests (Selenium + TestNG)

This folder contains Maven-based end-to-end tests using Selenium WebDriver and TestNG.

Prerequisites
- Java 17+
- Maven 3.6+
- Chrome browser installed (or modify to use another browser)
- Backend and frontend running locally during tests

Run tests

From this folder run:

```bash
cd e2e-tests
mvn test -Dfrontend.url=http://localhost:5174 -Dbackend.url=http://localhost:3010
```

To force the browser to open in Jenkins or any CI job, run without headless mode:

```bash
mvn test -Dfrontend.url=http://localhost:5174 -Dbackend.url=http://localhost:3010 -Dheadless=false
```

If the Jenkins agent does not have a desktop session, wrap the same command with `xvfb-run -a` so Chrome gets a display:

```bash
xvfb-run -a mvn test -Dfrontend.url=http://localhost:5174 -Dbackend.url=http://localhost:3010 -Dheadless=false
```

Notes
- Tests use WebDriverManager so you don't need to install ChromeDriver manually.
- TestNG reports will be generated in `test-output/index.html`.
- To run in headless mode set `-Dheadless=true`.
- For Jenkins Freestyle jobs, use an `Execute shell` step instead of the Maven build step if you want to pass `xvfb-run`.
