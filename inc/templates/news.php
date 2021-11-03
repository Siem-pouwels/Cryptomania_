      <template id="all-characters-template">
        {{#.}}
        <div class="card text-center text-white bg-dark">
          <div class="card-header">
            {{title}}
          </div>
          <div class="card-body">
            <p class="card-title">{{description}}</p>
            <p class="card-text">Author: {{author}}</p>
          </div>
          <div class="card-footer text-muted">
            <a class="original" href="{{url}}">Original</a>
            <p>{{publishedAt}}</p>
            <p class="source">Source: {{source.name}}</p>
          </div>
        </div>
        {{/.}}
      </template>