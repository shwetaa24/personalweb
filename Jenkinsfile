pipeline {
    agent any

    environment {
        DEPLOY_USER = 'ubuntu'
        DEPLOY_HOST = '65.1.194.177'
        DEPLOY_DIR  = '/var/www/html/'
        SSH_KEY     = '/var/lib/jenkins/.ssh/shivam.pub' // path to Jenkins SSH key
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
                git branch: 'master', url: 'https://github.com/shwetaa24/personalweb.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    if (fileExists('requirements.txt')) {
                        echo "Detected Python project. Installing dependencies..."
                        sh 'pip install -r requirements.txt'
                    } else if (fileExists('package.json')) {
                        echo "Detected Node.js project. Installing dependencies..."
                        sh 'npm install'
                    } else {
                        echo "No recognized build system found."
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (fileExists('requirements.txt')) {
                        echo "Running Python tests..."
                        sh 'pytest || exit 1'  // stop if tests fail
                    } else if (fileExists('package.json')) {
                        echo "Running Node.js tests..."
                        sh 'npm test || exit 1'
                    } else {
                        echo "No tests to run."
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying to staging server..."
                sh """
                    scp -i $SSH_KEY -r * $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_DIR
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded!"
            // Example Slack notification:
            // slackSend(channel: '#ci-cd', message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            echo "Pipeline failed!"
            // Example Slack notification:
            // slackSend(channel: '#ci-cd', message: "Build FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        always {
            echo "Pipeline finished."
        }
    }
}
