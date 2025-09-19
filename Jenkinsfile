pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout main branch
                git branch: 'main', url: 'https://github.com/shwetaa24/personalweb.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    echo "=== Build Stage ==="

                    # Remove existing virtual environment if exists
                    if [ -d "venv" ]; then
                        rm -rf venv
                    fi

                    # Create virtual environment
                    python3 -m venv venv

                    # Activate virtual environment
                    source venv/bin/activate

                    # Upgrade pip
                    pip install --upgrade pip

                    # Install requirements if exists
                    if [ -f "requirements.txt" ]; then
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

                    # Activate virtual environment
                    source venv/bin/activate

                    # Run tests only if pytest is installed
                    if command -v pytest &>/dev/null; then
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

                    # Create deployment folder if it doesn't exist
                    mkdir -p /var/www/html/myapp

                    # Remove old files
                    rm -rf /var/www/html/myapp/*

                    # Copy project files to deployment folder
                    cp -r Jenkinsfile README.md about.html chatbot contact.html css index.html js projects.html venv /var/www/html/myapp/
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
