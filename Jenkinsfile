pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/shwetaa24/personalweb.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    echo "=== Build Stage ==="

                    # Install dependencies globally (ensure Python & pip are installed)
                    if [ -f requirements.txt ]; then
                        pip3 install --upgrade pip
                        pip3 install -r requirements.txt
                    else
                        echo "requirements.txt not found, skipping dependency install"
                    fi
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "=== Test Stage ==="
                    if command -v pytest >/dev/null 2>&1; then
                        pytest
                    else
                        echo "pytest not installed, skipping tests"
                    fi
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "=== Deploy Stage ==="
                    DEPLOY_DIR="/var/www/html/myapp"

                    # Make sure deploy folder exists
                    if [ ! -d "$DEPLOY_DIR" ]; then
                        mkdir -p "$DEPLOY_DIR"
                    fi

                    # Copy project files
                    cp -r * "$DEPLOY_DIR/"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build, Test, Deploy succeeded on Linux!'
        }
        failure {
            echo '❌ Build Failed! Check logs.'
        }
    }
}
