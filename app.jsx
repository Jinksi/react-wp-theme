var App = React.createClass({
  getInitialState: function(){
    var posts = [];
    this.getPosts();
    return {
      posts: posts
    };
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
    return (
      <div className="app-container banner">
        <Header />
        <Content posts={this.state.posts}/>
        <Footer />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function(){
    return (
      <header className="header">
        <div className="container">
          <h1>Header</h1>
        </div>
      </header>
    );
  }
});

var Content = React.createClass({
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

var Footer = React.createClass({
  render: function(){
    return (
      <footer className="footer">
        <div className="container">
          <h1>Footer</h1>
        </div>
      </footer>
    );
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
