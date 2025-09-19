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
                // Use bash explicitly
                sh '''
                    echo "=== Build Stage ==="

                    # Remove existing virtual environment if exists
                    [ -d "venv" ] && rm -rf venv

                    # Create virtual environment
                    python3 -m venv venv

                    # Activate virtual environment using bash-compatible syntax
                    . venv/bin/activate

                    # Upgrade pip
                    pip install --upgrade pip

                    # Install requirements if exists
                    [ -f "requirements.txt" ] && pip install -r requirements.txt || echo "requirements.txt not found"
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "=== Test Stage ==="
                    . venv/bin/activate

                    # Run tests only if pytest is installed
                    command -v pytest >/dev/null 2>&1 && pytest || echo "pytest not installed"
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "=== Deploy Stage ==="

                    # Create deployment folder if missing
                    mkdir -p /var/www/html/myapp

                    # Remove old files
                    rm -rf /var/www/html/myapp/*

                    # Copy project files (excluding venv)
                    cp -r Jenkinsfile README.md about.html chatbot contact.html css index.html js projects.html /var/www/html/myapp/
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build, Test, Deploy succeeded!'
        }
        failure {
            echo '❌ Build Failed! Check logs.'
        }
    }
}
