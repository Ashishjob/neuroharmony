terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 1.10"
    }
  }
}

provider "mongodbatlas" {
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

resource "mongodbatlas_project" "hackathon_project" {
  name   = "Hackathon Project"
  org_id = var.atlas_org_id
}

resource "mongodbatlas_cluster" "hackathon_cluster" {
  project_id             = mongodbatlas_project.hackathon_project.id
  name                   = "hackathon-cluster"
  mongo_db_major_version = "5.0"
  cluster_type           = "REPLICASET"
  replication_specs {
    num_shards = 1
    regions_config {
      region_name     = "US_EAST_2"
      electable_nodes = 3
      priority        = 7
      read_only_nodes = 0
    }
  }
  provider_name               = "AWS"
  provider_instance_size_name = "M10"
}

resource "mongodbatlas_database_user" "hackathon_user" {
  username           = "hackathon-user"
  password           = var.db_password
  project_id         = mongodbatlas_project.hackathon_project.id
  auth_database_name = "admin"

  roles {
    role_name     = "readWrite"
    database_name = "hackathon_db"
  }
}

variable "mongodbatlas_public_key" {
  description = "MongoDB Atlas public key"
}

variable "mongodbatlas_private_key" {
  description = "MongoDB Atlas private key"
}

variable "atlas_org_id" {
  description = "MongoDB Atlas organization ID"
}

variable "db_password" {
  description = "Password for the database user"
}