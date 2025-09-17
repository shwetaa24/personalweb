pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/shwetaa24/jenkinssetup.git'
            }
        }

        stage('Build') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        sh '''
                            cd frontend
                            npm install
                            npm run build
                        '''
                    }
                }
                stage('Build Backend') {
                    steps {
                        sh '''
                            cd backend
                            chmod +x gradlew
                            ./gradlew build
                        '''
                    }
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }
    }
}
