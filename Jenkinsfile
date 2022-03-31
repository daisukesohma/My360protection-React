def project_name = 'assetsmangement-web'
def dirName = "${project_name}"-env.BRANCH_NAME
def production_branch = 'master'
def development_branch = 'development'
def sshagent_name = 'my360protection-nvirginia'
def development_ip_address = '54.160.141.242'
def production_ip_address = '35.171.1.150'

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: "7"))
    }
    agent {
        docker {
            image "node:8"
            args "-v /usr/share/nginx/html/${dirName}:/var/empty2 -v /root/dcompose/${dirName}:/var/empty"
        }
    }
    stages {
        stage("Build")
        {
            steps
            {
                sh "npm install"
                script {
                    if (env.BRANCH_NAME == "${development_branch}") {
                        sh "mv .env.development .env"
                        sh "npm run build"
                        sh "cp -a build/. /var/empty/"
                    }else if (env.BRANCH_NAME == "${production_branch}") {   
                        sh "mv .env.master .env"
                        sh "npm run build"
                        sh "cp -a build/. /var/empty/"
                    }
                }
            }
        }

        stage("Deploy")
        {
            steps
            {
                script {
                    if (env.BRANCH_NAME == "${development_branch}") {
                      sshagent ( ["${sshagent_name}"]) {
                          sh "cd  /root/dcompose/${dirName} && ls" 
                          sh "apt-get update && apt-get install zip"
                          sh "cd  /root/dcompose/${dirName} && zip -r latest.zip ."

                          sh "scp -o StrictHostKeyChecking=no /root/dcompose/${dirName}/latest.zip ubuntu@${development_ip_address}:/home/ubuntu/"
                          sh "ssh -o StrictHostKeyChecking=no ubuntu@${development_ip_address} ls -la /home/ubuntu"
                          sh "ssh -o StrictHostKeyChecking=no ubuntu@${development_ip_address} sudo unzip  -o /home/ubuntu/latest.zip -d /var/www/assetsweb"
                      }

                    }else if (env.BRANCH_NAME == "${production_branch}") {
                      sshagent ( ["${sshagent_name}"]) {
                          sh "cd  /root/dcompose/${dirName} && ls" 
                          sh "apt-get update && apt-get install zip"
                          sh "cd  /root/dcompose/${dirName} && zip -r latest.zip ."

                          sh "scp -o StrictHostKeyChecking=no /root/dcompose/${dirName}/latest.zip ubuntu@${production_ip_address}:/home/ubuntu/"
                          sh "ssh -o StrictHostKeyChecking=no ubuntu@${production_ip_address} ls -la /home/ubuntu"
                          sh "ssh -o StrictHostKeyChecking=no ubuntu@${production_ip_address} sudo unzip  -o /home/ubuntu/latest.zip -d /var/www/assetsweb"
                      }
                    }
                }
            }
        }
    }
    post { 
        always { 
            cleanWs()
        }
    }
}
