/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function() {
  // callback
});

var TransitionGroup = React.addons.CSSTransitionGroup;

var App = React.createClass({
  getDefaultProps: function(){
    return {
      wordpressUrl: 'http://localhost:8888/react-wp-server'
    };
  },
  getInitialState: function(){
    var posts = [
      {
        id:1,
        title:'Post 1',
        content: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '2015/12/14',
        imgUrl: 'https://unsplash.it/1920/1080?random'
      },
      {
        id:2,
        title:'Post 2',
        content: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '2015/12/10',
        imgUrl: 'https://unsplash.it/1920/1081?random'

      },
      {
        id:3,
        title:'This is another post',
        content: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '2015/07/10',
        imgUrl: 'https://unsplash.it/1920/1082?random'

      }
    ];
    var pages = [
      {
        id:1,
        title: 'Home',
        content: '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ];
    this.getPosts();
    this.getPages();
    return {
      posts: posts,
      pages: pages,
      currentPage: pages[0]
    };
  },
  handlePageChange: function(target){
    if(target === 'home' || target === 'blog'){
      this.setState({
        currentPage: target
      });
    }
    this.state.pages.map(function(page){
      if(page.title === target){
        this.setState({
          currentPage: page
        });
      }
    }.bind(this));
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
    var self = this;
    var postData = self.getData(self.props.wordpressUrl + '/wp-json/wp/v2/posts', function(data){
      var posts = [];
      data.map(function(post){
        posts = posts.concat({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          date: post.date,
          imgId: post.featured_image
        });
      });
      self.setState({
        posts: posts
      });
    });
  },
  getPages : function(){
    var Component = this;
    var pagesData = this.getData(this.props.wordpressUrl + '/wp-json/wp/v2/pages', function(data){
      var pages = [];
      data.map(function(page){
        pages = pages.concat({
          id: page.id,
          title: page.title.rendered,
          content: page.content.rendered,
          date: page.date,
          menuOrder: page.menu_order
        });
      });
      pages = _.sortBy(pages, 'menuOrder');
      Component.setState({
        pages: pages
      });
    });
  },
  getImage: function(id, callback){
    this.getData(this.props.wordpressUrl + '/wp-json/wp/v2/media/' + id, callback);
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
      switch (state.currentPage){
        case "home":
          return <Home />;
        case "blog":
          return <Posts
            posts={state.posts}
            handleClickPost={this.handlePostChange}
            getImage={this.getImage}/>;
        case "page":
          return <Page page={state.currentPage} />;
        case "single":
          return <Single post={state.currentPost} />;
        default:
          return <Page page={state.currentPage} />;
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

    }.bind(this);
    return (
      <header className="header">
        <div className="container">
          <p>This is the component <code>{'<Header/>'}</code></p>
            <ul>
              {/*<li><a href="#home" onClick={this.handleClick}>Home</a></li>*/}
              {this.props.pages.map(function(page){
                  return (
                    <li key={page.id}><a href={'#' + page.title} onClick={this.handleClick}>{page.title}</a></li>
                  );
                }.bind(this))}
              <li><a href="#blog" onClick={this.handleClick}>Blog</a></li>

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
//≠≠≠≠≠≠≠≠≠ Page
var Page = React.createClass({
  render: function(){
    return (
      <div className="page">
          <div className="container">
            <div dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>
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
        <Post post={post}
          key={post.id}
          handleClick={this.handleClick}
          getImage={this.props.getImage}/>
      );
    }.bind(this));
    return (
      <div className="posts">
        {renderPosts}
      </div>
    );
  }
});

var Post = React.createClass({
  getInitialState : function(){
    return {
      imgUrl : ''
    };
  },
  componentDidMount: function(){
    this.props.getImage(this.props.post.imgId, function(data){
      this.setState({
        imgUrl : data.source_url
      });
    }.bind(this));
  },
  render: function(){
    return (
      <div className="post"
        data-post-id={this.props.post.id}
        onClick={this.props.handleClick}

        style={{backgroundImage: 'url(' + this.state.imgUrl + ')'}}>
        <h5 className="title">{this.props.post.title}</h5>
        <span className="date">{moment(new Date(this.props.post.date)).fromNow()}</span>
      </div>
    );
  }
});

var Single = React.createClass({
  render: function(){
    return (
      <div className="post single">
        <div className="featured-image" style={{backgroundImage: 'url(' + this.props.post.imgUrl + ')'}}></div>
        <div className="single-wrap">
          <h5 className="title">{this.props.post.title}</h5>
          <span className="date">{moment(this.props.post.date).format("MMM Do YYYY")}</span>
          <div className="post-content" dangerouslySetInnerHTML={{__html: this.props.post.content}} />
        </div>
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
      <footer className="footer">
          <div className="container">
            <p>This is the component <code>{'<Footer/>'}</code></p>
          </div>
        </footer>
    );
  }
});

ReactDOM.render(
  <App />, document.getElementById('app')
);
