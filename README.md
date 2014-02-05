Acme Insights
=============

## Welcome

Welcome to the SSP Ruby Drill!

The goal of this drill is to see how we would work together as a team using the same workflow and tools that we use every day. It's OK if you don't have experience with some of the tools we use, learning is part of the game!

## Data

You should have access to the [acme-data](https://github.com/sspinc/acme-data) repository as it is configured as a submodule under the `data` directory. There, you will find TSV files that contain the products, orders and returns of the fictional company, [Acme Corporation](http://en.wikipedia.org/wiki/Acme_Corporation).

## Task

By forking this repository, you should build a Rails application that provides some insights into the data. Here are a few examples, but we encourage you to come up with ones that you find interesting:

 * What are the best selling brands?
 * Which department had the highest return rate?
 * How much do users order on average?
 * Does price affect return rates?

## Tools

We're opinionated and we also have a bunch of legacy stuff, so we'd like you to use some of our existing tools, but feel free to also use others:


 * [MongoDB](http://www.mongodb.org/) is a silver bullet (oh and it's also [web scale](http://www.youtube.com/watch?v=b2F-DItXtZs))
 * [Mongoid](http://mongoid.org/) is the best MongoDB ODM
 * [Boostrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/) make unicorns cry rainbows
 * [Rails](http://rubyonrails.org/) is still the most productive web development framework
 * [RSpec](https://relishapp.com/rspec) comes the closest to self-documenting code

## Tips

 * Do not reinvent the wheel
 * There are no stupid questions
 * Use [MongoDB Aggregations](http://docs.mongodb.org/manual/aggregation/) over simple queries

## Workflow

We use Github's [Github Flow](http://scottchacon.com/2011/08/31/github-flow.html) because copying is the best form of flattery. As such, we open pull requests to review each other's code and we let [Travis](https://travis-ci.com/) scream if our tests are failing. **master** is sacred.
