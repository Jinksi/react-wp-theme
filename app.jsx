var App = React.createClass({
  getDefaultProps: function(){
    return {
      postsUrl: 'http://localhost:8888/react-wp-server/wp-json/wp/v2/posts',
      pagesUrl: 'http://localhost:8888/react-wp-server/wp-json/wp/v2/pages'
    };
  },
  getInitialState: function(){
    var posts = [
      {
        id:1,
        title:'Default',
        content: 'none'
      }
    ];
    var pages = [
      {
        id:2,
        title: 'Default',
        content: 'none'
      }
    ];
    this.getPosts();
    this.getPages();
    return {
      posts: posts,
      pages: pages,
      currentPage: 'home'
    };
  },
  handlePageChange: function(target){
    this.setState({
      currentPage: target
    });
  },
  handlePostChange: function(postId){
    this.state.posts.map(function(post){
      if(post.id === parseInt(postId)){
        this.setState({
          currentPage: 'single',
          currentPost: post
        });
      }
    }.bind(this));
  },
  getPosts : function(){
    var Component = this;
    var postData = this.getData(this.props.postsUrl, function(data){
      var posts = [];
      data.map(function(post){
        posts = posts.concat({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          date: post.date
        });
      });
      Component.setState({
        posts: posts
      });
    });
  },
  getPages : function(){
    var Component = this;
    var pagesData = this.getData(this.props.pagesUrl, function(data){
      var pages = [];
      data.map(function(page){
        pages = pages.concat({
          id: page.id,
          title: page.title.rendered,
          content: page.content.rendered,
          date: page.date
        });
      });
      Component.setState({
        pages: pages
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
          return <Posts posts={state.posts} handleClickPost={this.handlePostChange}/>;
        case "page":
          return <Page page={state.currentPage} />;
        case "single":
          return <Single post={state.currentPost}/>;
        default:
          return <NoMatch />;
      }
    }.bind(this);
    return (
      <div className="app-container banner">
        <Header handlePageChange={this.handlePageChange} pages={this.state.pages}/>
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
    var renderNavPages = function(){
      console.log(this.props.pages);

    }.bind(this);
    return (
      <header className="header">
        <div className="container">
          <p>This is the component <code>{'<Header/>'}</code></p>
            <ul>
              <li><a href="#home" onClick={this.handleClick}>Home</a></li>
              <li><a href="#posts" onClick={this.handleClick}>Posts</a></li>
              {this.props.pages.map(function(page){
                  return (
                    <li key={page.id}><a href={'#' + page.title} onClick={this.handleClick}>{page.title}</a></li>
                  );
                }.bind(this))}
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
  handleClick: function(e){
    e.preventDefault();
    this.props.handleClickPost(e.target.attributes['data-post-id'].value);
  },
  render: function(){
    var renderPosts = this.props.posts.map(function(post){
      return (
        <Post post={post} key={post.id} handleClick={this.handleClick}/>
      );
    }.bind(this));
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
      <div className="post" data-post-id={this.props.post.id} onClick={this.props.handleClick}>
        <h5 className="title">{this.props.post.title}</h5>
        <span className="date">{moment(this.props.post.date).format("MMM Do YYYY")}</span>
      </div>
    );
  }
});

var Single = React.createClass({
  render: function(){
    return (
      <div className="post single container">
        <h5 className="title">{this.props.post.title}</h5>
        <span className="date">{moment(this.props.post.date).format("MMM Do YYYY")}</span>
        <div className="post-content" dangerouslySetInnerHTML={{__html: this.props.post.content}} />
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
          <p>This is the component <code>{'<Footer/>'}</code></p>
        </div>
    );
  }
});

ReactDOM.render(
  <App />, document.getElementById('app')
);
