<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">

        <div class="container-fluid">

            <router-link class="navbar-brand" to="/">
                <i class="bi bi-star h1"></i>
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">
                            <i class="i bi-house"></i> Home
                        </router-link>
                    </li>
                </ul>
            </div>
            
        </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style>
  
  </style>