pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/master']], // or main
                    userRemoteConfigs: [[url: 'https://github.com/shwetaa24/personalweb.git']]
                ])
            }
        }

        stage('Build') {
            steps {
                sh '''
                    echo "=== Build Stage ==="

                    # Remove existing venv
                    if [ -d "venv" ]; then
                        rm -rf venv
                    fi

                    # Create virtual environment
                    python3 -m venv venv
                    source venv/bin/activate

                    # Upgrade pip
                    pip install --upgrade pip

                    # Install requirements
                    if [ -f requirements.txt ]; then
                        pip install -r requirements.txt
                    else
                        echo "requirements.txt not found, skipping pip install"
                    fi
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "=== Test Stage ==="
                    source venv/bin/activate

                    # Run tests if pytest installed
                    if command -v pytest > /dev/null; then
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
                    . venv/bin/activate

                    DEPLOY_PATH="/var/www/html"  # example path
                    if [ -d "$DEPLOY_PATH" ]; then
                        cp -r * "$DEPLOY_PATH"
                        echo "Deployment completed!"
                    else
                        echo "Deployment folder not found, skipping deploy"
                    fi
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build, Test, Deploy succeeded on Linux!'
        }
        failure {
            echo '❌ Build failed on Linux!'
        }
    }
}
