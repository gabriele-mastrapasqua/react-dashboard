# Challenge

Given a dataset with the following columns (provided in the .zip we sent)

* device_id
* lat
* lng
* timestamp (unix timestamp)

that records the advertisement views (in the advertisement slang, they are called "impressions") coming from mobile devices, build a web project, consisting of an API service and a client, that answers the following questions:

* How many impressions are coming from each device?
* How many impressions for each hour of the day?

We expect the candidate to complete the challenge in 3 hours.

# Requirements

You should send your project as a .zip file containing everything needed to run your code, including a `README.md` file and a script that runs the application. 
The project should also contain a git repo, remember to run `git init` at the beginning and progressively commit your changes.

Remember: 

* In this case you don't need to use a DB for queries
* You don't need to use third party APIs to complete the assignment, even the bonus points you see below

## Client

ReactJS would be great but it's not a requirement, Redux isn't a requirement. 
Interactive visualizations are strongly preferred.

## API

Use a language of your choice. We would gladly prefer: JavaScript/TypeScript, Java, Kotlin.

# Bonus points

* How many impressions for each country? (no geocoding needed, the provided map should be useful and a map visualization would be great here)
* WebGL visualizations
* Using docker
* How many impressions for each day of the week?
* How many impressions for each day of the month?
