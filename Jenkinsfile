pipeline {
    agent any

    tools {
        maven 'Maven 3'
        jdk 'JDK 17'
    }

    environment {
        FRONTEND_URL = 'http://localhost:5173'
        BACKEND_URL = 'http://localhost:3010'
        PROVIDER_URL = 'http://localhost:5175'
    }

    stages {
        stage('Start Services') {
            steps {
                echo 'Starting backend & frontend services in background...'
                dir('Urban/backend') {
                    sh 'npm install'
                    sh 'npm run start &'
                }
                dir('Urban/frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm run preview -- --port 5173 &'
                }
                dir('serviceProviders/serviceProviderbackend') {
                    sh 'npm install'
                    sh 'npm run start &'
                }
                dir('serviceProviders/serviceProviderfrontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm run preview -- --port 5175 &'
                }
                // Sleep for services to fully start up
                sh 'sleep 10'
            }
        }

        stage('Run E2E Tests') {
            steps {
                echo 'Running Selenium E2E Tests...'
                dir('Urban/e2e-tests') {
                    sh 'mvn clean test -Dheadless=true -Dfrontend.url=${FRONTEND_URL} -Dbackend.url=${backendUrl} -Dprovider.url=${PROVIDER_URL}'
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving test results and artifacts...'
            dir('Urban/e2e-tests') {
                junit '**/target/surefire-reports/*.xml'
                archiveArtifacts artifacts: '**/target/surefire-reports/failure-artifacts/**', allowEmptyArchive: true
            }
            echo 'Stopping background services...'
            sh 'pkill -f "node index.js" || true'
            sh 'pkill -f "vite" || true'
            sh 'pkill -f "server.js" || true'
        }
    }
}
