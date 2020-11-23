# WORDUP App

---
## Table of Contents

- [WORD UP app](#word-up-app)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Architecture](#architecture)
  - [Release Notes](#release-notes)
  - [Naming Conventions](#naming-conventions)

---
## Introduction

TODO- Introduction to our app and purpose 

---

## Architecture
[Diagram](assets/snack-icon.png)

---

## Release Notes
    Release Notes version WORDUP 1.0.0

#### NEW FEATURES
* Created new screens and management features for admin account
* Screens auto update when new alerts,  jobs, and events are posted or deleted
* Created a Homescreen with images of the EcoDistrict Hampton Roads

#### BUG FIXES
* Fixed Events screen to show Event Creator
* Fixed Alerts UI screen to position alert types
#### KNOWN BUGS
* Screens do not have pagination 
* Admin can’t signup for an event

#### INSTALLATION

#### PRE-REQUISITES
You must have JDK 1.8 installed and configured before proceeding. see sun.com/jdk/download
    DEPENDENCIES
    Download and install HDFS v. 2.3.3 (see  hdfs.com/install/guide)
                       Download and install you_guess v. 4.32 (see youg.com/latest/guide)
    DOWNLOAD
                   github.com/grubw/download_zip
    BUILD
    No build necessary for this app.  download_zip contains an executable jar file
    INSTALLATION
                   Copy the .jar file into any location you desire
                   Add  grub.jar to your CLASSPATH by editing your environment variables.
   RUNNING APPLICATION
                    Launch a terminal window and type:  java -jar  grub.jar

---

## Naming Conventions

- Team mates are expected to follow these git conventions thorughout the project to have a standard structure for the commits (section will be deleted before final deliverable)

    #### Branch Names
    - Branch Names need to follow the format: `<Sprint Number>/<Epic Name>/..>`
    - For example: `SprintOne/CommunityEvents`

    #### Commit Messages
    - Commit Messages need to follow the format `[<Sprint Number> - <Epic Name>] : commit message`
    - For example: `[Sprint One - Community Events]: updated Events creation form`

