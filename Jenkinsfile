pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Use the correct branch
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/master']], // change to 'main' if your repo uses main
                    userRemoteConfigs: [[url: 'https://github.com/shwetaa24/personalweb.git']]
                ])
            }
        }

        stage('Build') {
            steps {
                powershell '''
                    Write-Host "=== Build Stage ==="

                    # Remove old virtual environment if exists
                    if (Test-Path .\\venv) {
                        Write-Host "Removing existing venv..."
                        Remove-Item -Recurse -Force .\\venv
                    }

                    # Create virtual environment
                    python -m venv venv
                    if ($LASTEXITCODE -ne 0) { exit 1 }

                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1
                    if ($LASTEXITCODE -ne 0) { exit 1 }

                    # Upgrade pip
                    pip install --upgrade pip
                    if ($LASTEXITCODE -ne 0) { exit 1 }

                    # Install requirements
                    if (Test-Path .\\requirements.txt) {
                        pip install -r .\\requirements.txt
                        if ($LASTEXITCODE -ne 0) { exit 1 }
                    } else {
                        Write-Host "requirements.txt not found, skipping pip install"
                    }
                '''
            }
        }

        stage('Test') {
            steps {
                powershell '''
                    Write-Host "=== Test Stage ==="

                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1
                    if ($LASTEXITCODE -ne 0) { exit 1 }

                    # Run tests if pytest is installed
                    if (Get-Command pytest -ErrorAction SilentlyContinue) {
                        pytest
                        if ($LASTEXITCODE -ne 0) { exit 1 }
                    } else {
                        Write-Host "pytest not installed, skipping tests"
                    }
                '''
            }
        }

        stage('Deploy') {
            steps {
                powershell '''
                    Write-Host "=== Deploy Stage ==="

                    # Activate virtual environment
                    .\\venv\\Scripts\\Activate.ps1
                    if ($LASTEXITCODE -ne 0) { exit 1 }

                    # Deploy files to IIS or any target folder
                    $deployPath = "C:\\inetpub\\wwwroot"
                    if (Test-Path $deployPath) {
                        Copy-Item -Path * -Destination $deployPath -Recurse -Force
                        Write-Host "Deployment completed!"
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
