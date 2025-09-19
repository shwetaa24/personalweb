pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/shwetaa24/personalweb.git']]
                ])
            }
        }

        stage('Build') {
            steps {
                powershell '''
                    # If venv exists, remove it to start fresh
                    if (Test-Path .\\venv) {
                        Remove-Item -Recurse -Force .\\venv
                    }

                    # Create virtual environment
                    python -m venv venv

                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1

                    # Upgrade pip
                    pip install --upgrade pip

                    # Install requirements if requirements.txt exists
                    if (Test-Path .\\requirements.txt) {
                        pip install -r .\\requirements.txt
                    } else {
                        Write-Host "requirements.txt not found, skipping pip install"
                    }
                '''
            }
        }

        stage('Test') {
            steps {
                powershell '''
                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1

                    # Run tests only if pytest is installed
                    if (Get-Command pytest -ErrorAction SilentlyContinue) {
                        pytest
                    } else {
                        Write-Host "pytest not installed, skipping tests"
                    }
                '''
            }
        }

        stage('Deploy') {
            steps {
                powershell '''
                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1

                    # Deploy files to web folder (example path)
                    if (Test-Path C:\\inetpub\\wwwroot) {
                        Copy-Item -Path * -Destination C:\\inetpub\\wwwroot -Recurse -Force
                    } else {
                        Write-Host "Deployment folder not found, skipping deploy"
                    }
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build, Test, Deploy succeeded on Windows!'
        }
        failure {
            echo '❌ Build failed on Windows!'
        }
    }
}
