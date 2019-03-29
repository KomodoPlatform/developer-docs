# Standard Security Setup for Nodes

Here are some steps to get a secured Komodo node. These are just some simple babysteps and to get a real secured server you also need to investigate why you need one. Only then you will understand that a secured server is imminent for hosting a Komodo Notary node.

## Step 1 - Install a minimal installation of Ubuntu

- Always use a [minimal install](https://help.ubuntu.com/community/Installation/MinimalCD) of Ubuntu! If you don't do this and you use a standard iso of Ubuntu it will setup all kinds of services which you do not need. It will open up ports on your server which could be vulnerable to future exploits. So, the first step for a secured server is a minimal installation.

When installing a minimal setup of Ubuntu, be sure you select the OpenSSH server at the end of the graphical installation. Otherwise you cannot connect to your server if you are not using a KVM node.

## Step 2 - Create your own private SSH keys

- By selecting the OpenSSH server at the installation, you also created a vulnerable spot. Hackers love brute forcing the SSH service. If you use a strong password, you're mostly safe to go for a while. But even when it is strong, it could be hijacked at some point, so it is wise to disable password login. We do this by creating our own SSH key, so we can use that later as the key to the front door of your server. [Click here](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) for a tutorial how to create your own SSH key.

## Step 3 - Create another user for your server and disable root account

- Root is the uberboss of your server. It can do everything without needing special permissions. So you might understand that this is also a vulnerability issue for your server. Although it is created by default, you should not use it. Only in special cases it is needed. Because root is the first name they try when they try to brute force your server, we need to disable it asap. But before we do that, we need to create a user which get the same root rights as root. Maybe you will ask yourself now "what's the difference?". Simple, the hacker needs to know the name of the new user before they can go on with their brute force attack. It is a tiny step to max security, but a very crucial one. [Click here](https://www.digitalocean.com/community/tutorials/how-to-add-delete-and-grant-sudo-privileges-to-users-on-a-debian-vps) for a tutorial how to create a user with sudo rights on a Debian based system (don't worry, Ubuntu is a Debian based system ;))

## Step 4 - Login as the new user and copy your SSH key

- So now we have a new user (with root rights) and a freshly created SSH key we can now login to the server as the new user and store our SSH key on it. We can do this on a stupid way (creating .ssh dir, set the rights on it, creating authorized_keys file and set the permissions on it etc. etc.), but we are doing it the easy way. As logging into the server isn't part of any security course, I expect you already know how to do that. But to store our SSH key automatically we are doing this:

```bash
ssh-copy-id user@server.com
```

- This will setup the procedure to store your public SSH key on the server. Once the script gets access to the remote account, it modifies/creates the `~/.ssh/authorized_keys` files in your own home directory. It may also fix permissions of the user's home directory if they are inappropriate. After it has been doing its thingy, you'll notice you aren't logged in yet. So login again to your server on the normal way (`ssh user@server.com`) and you will notice that you do not have to enter your password again. It logs in straight away. This gives us the opportunity to disable password login and root access to the server.

## Step 5 - Disable password login and root access

- Now it is time to secure your OpenSSH server. Yes, i know, people will tell you to change your SSH port to a different one then port 22, but personally I don't think it is needed. If they want your server so badly, they will scan your ports anyway and they will find out your new port you have assigned to it. It is better to secure your OpenSSH server. First we will disallow access for user root. Even when he is the uberboss...it is time to take over his job by disable the account for access. So login to your server as the user you have created and which can login with his SSH key (and be sure this works before you go on, otherwise you won't get in anymore). Then open up the config file of your OpenSSH server.

```bash
sudo vi /etc/ssh/sshd_config
```

- Find the following: `PermitRootLogin` and set this to `no`. (Make sure you have a non-root user with sudo privileges created already before doing this step and you can login using that user account. Otherwise, you will be locked out of your server.) So it will look like this:

```bash
PermitRootLogin no
```

- Now find the following: `PasswordAuthentication` and set this to `NO`. So it will look like this:

```bash
PasswordAuthentication no
```

- Save the file and restart your OpenSSH server by doing the following

```bash
sudo service ssh restart
```

- Open a second shell and try to login with your root account (do NOT log out the first shell. In case something went wrong, you are not able to login anymore). If everything went well then the root account is being blocked and even brute forcing the OpenSSH server has become impossible, because the server isn't accepting any kind of password.

**To be continued...**
