pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shwetaa24/personalweb.git'
            }
        }

        stage('Build') {
            steps {
                // Use PowerShell for Windows
                powershell '''
                    # Create virtual environment
                    python -m venv venv

                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1

                    # Upgrade pip and install requirements
                    pip install --upgrade pip
                    pip install -r .\\requirements.txt
                '''
            }
        }

        stage('Test') {
            steps {
                powershell '''
                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1

                    # Run tests
                    pytest
                '''
            }
        }

        stage('Deploy') {
            steps {
                powershell '''
                    # Activ
