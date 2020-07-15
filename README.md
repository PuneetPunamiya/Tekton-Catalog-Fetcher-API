# Tekton Catalog API POC 

## Description

This Tekton Catalog API will take a Tekton Pipeline yaml in JSON format
and fetch all tasks from the [catalog](https://github.com/tektoncd/catalog).


## Usage



### endpoints

The `/get/tasks` endpoint will fetch all the tasks based on the pipeline.
The response is a K8s List of the tasks and pipelines needed. 