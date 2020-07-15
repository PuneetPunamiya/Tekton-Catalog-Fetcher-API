# Tekton Catalog API POC 

## Description

This Tekton Catalog API will take a Tekton Pipeline yaml in JSON format
and fetch all tasks from the [catalog](https://github.com/tektoncd/catalog).

TLDR; This will apply your pipeline and the task you reference from the catalog automatically.
(I used javascript instead of golang cause the task/pipeline structs were giving me problems :crying_cat_face:)

## Usage

There is an poc [endpoint](https://tekton-catalog-api.netlify.app/.netlify/functions/api/) at 
`https://tekton-catalog-api.netlify.app/.netlify/functions/api/`


## Install

### USE API in CLI

Requirements

* kubectl
* httpie

You put this command in terminal or your bashrc 
1) `tkapply() { kubectl get -f $1 -o json  | http https://tekton-catalog-api.netlify.app/.netlify/functions/api/get/tasks | kubectl apply -f - }`

2) `tkapply <file>`

### endpoints

The `/get/tasks` endpoint will fetch all the tasks based on the pipeline.
The response is a K8s List of the tasks and pipelines needed. 
