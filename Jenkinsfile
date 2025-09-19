pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/shwetaa24/personalweb.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    echo "=== Build Stage ==="

                    # Create a virtual environment in workspace
                    python3 -m venv venv

                    # Activate virtual environment
                    . venv/bin/activate

                    # Upgrade pip and install dependencies inside venv
                    if [ -f requirements.txt ]; then
                        pip install --upgrade pip
                        pip install -r requirements.txt
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

                    # Activate virtual environment
                    . venv/bin/activate

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

                    # Ensure deploy folder exists with correct permissions
                    sudo mkdir -p "$DEPLOY_DIR"
                    sudo chown -R $USER:$USER "$DEPLOY_DIR"

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
