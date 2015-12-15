var App = React.createClass({
  getInitialState: function(){
    var posts = [];
    this.getPosts();
    return {
      posts: posts,
      currentPage: 'home'
    };
  },
  handlePageChange: function(target){
    this.setState({
      currentPage: target
    });
  },
  getPosts : function(){
    var Component = this;
    var postData = this.getData('/example-data.json', function(data){
      var posts = [];
      data.map(function(post){
        posts = posts.concat({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered
        });
      });
      Component.setState({
        posts: posts
      });
    });
  },
  getData: function(url, callback){
    $.ajax({
      url: url,
      type: 'GET'
    }).done(function(data){
      callback(data);
    });
  },
  render: function(){
    var renderPage = function(state){
      console.log('Rendering ' + state.currentPage);
      switch (state.currentPage){
        case "home":
          return <Home />;
        case "posts":
          return <Posts posts={state.posts}/>;
        default:
          return <NoMatch />;
      }
    };
    return (
      <div className="app-container banner">
        <Header handlePageChange={this.handlePageChange}/>
          {renderPage(this.state)}
        <Footer />
      </div>
    );
  }
});

var Header = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    var target = e.target.href.split('#')[1];
    this.props.handlePageChange(target);
  },
  render: function(){
    return (
      <header className="header">
        <div className="container">
          <h1>Header</h1>
            <ul>
              <li><a href="#home" onClick={this.handleClick}>Home</a></li>
              <li><a href="#posts" onClick={this.handleClick}>Posts</a></li>
            </ul>
        </div>
      </header>
    );
  }
});

//≠≠≠≠≠≠≠≠≠ Home
var Home = React.createClass({
  render: function(){
    return (
      <div className="home">
          <div className="container">
            <h4>Home Page</h4>
            <p>This is the component <code>{'<Home/>'}</code></p>
          </div>
      </div>
    );
  }
});

//≠≠≠≠≠≠≠≠≠ Posts

var Posts = React.createClass({
  render: function(){
    var renderPosts = this.props.posts.map(function(post){
      return (
        <Post post={post} key={post.id} />
      );
    });
    return (
      <div className="posts container">
        {renderPosts}
      </div>
    );
  }
});

var Post = React.createClass({
  render: function(){
    return (
      <div className="post">
        <h4 className="title">{this.props.post.title}</h4>
        <div dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>
      </div>
    );
  }
});

//≠≠≠≠≠≠≠≠≠ NoMatch
var NoMatch = React.createClass({
  render: function(){
    return (
      <div className="four04">
          <div className="container">
            <h4>404</h4>
            <p>Not Found</p>
          </div>
      </div>
    );
  }
});


var Footer = React.createClass({
  render: function(){
    return (
        <div className="container">
            <h1>Footer</h1>
        </div>
    );
  }
});

ReactDOM.render(
  <App />, document.getElementById('app')
);
