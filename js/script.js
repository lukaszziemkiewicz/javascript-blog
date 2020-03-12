
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorRigthtColumnLink: Handlebars.compile(document.querySelector('#template-author-right-column-link').innerHTML)
}
'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!'),
  console.log(event);

  /* remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:' , clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log (articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log (targetArticle);
  
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';



  function generateTitleLinks(customSelector = ''){
    debugger;
/* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log (articles);
  for(let article of articles){

    let html = '';

    /* get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */ /* get the title from the title element */
  
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    console.log (articleTitle);

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log (linkHTML);

    /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', linkHTML);
    
    
    html = html + linkHTML;
    console.log(html);
   
  } 
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  } 
}

generateTitleLinks();

function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector); 
    console.log (tagsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log (articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    
    for(let tag of articleTagsArray){


      /* generate HTML of the link */

      const linkHTMLData = {tag: tag, tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);
     
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */ 
    
  }
  
  const tags = document.querySelectorAll('.post-tags .list li a');

  for(let tag of tags){
    tag.addEventListener('click', tagClickHandler);
  } 
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(event);

  /* make a new constant "tag" and extract tag from the "href" constant */
  
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log (tagLinks);

  /* START LOOP: for each active tag link */
  
  for(let tagLink of tagLinks){

    /* remove class active */

    tagLink.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  
  const hreftagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let hrefTagLink of hreftagLinks){

    /* add class active */

    hrefTagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */
  
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags .list a');
  console.log(tagLinks);
  
  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);
    
  } 

}

addClickListenersToTags();

function generateAuthors(){

  /*  [NEW] create a new variable allAuthors with an empty object*/

  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find authors wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorSelector); 
    console.log (authorsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-author attribute */

    const author = article.getAttribute('data-author');
    console.log (author);

    /* generate HTML of the link */
    
    const linkHTMLData = {author: author, author: author};
    const linkHTML = templates.authorLink(linkHTMLData);
    
    console.log (linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML;
    console.log(html);

    /* insert HTML of all the links into the  authorswrapper */

    authorsWrapper.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */ 

    /* [NEW] check if this link is NOT already in allAuthors */

    if(!allAuthors.hasOwnProperty(author)){
      /* [NEW] add tag to allTags object */
      allAuthors[author] = 1;
    } else {
        allAuthors[author]++;
      }
  /* END LOOP: for each tag */
      console.log(allAuthors);
  }

  const authorListWrapper = document.querySelector(optAuthorsListSelector);
  console.log (authorListWrapper);

  /* [NEW] create variable for all links HTML code */

  /*let allAuthorsHTML = '';*/

  const allAuthorsData = {authors: []};

  /*[NEW] START LOOP: for each tag in allTags: */
  for(let author in allAuthors){
    /*[NEW] generate code of a link and add it to allTagsHTML */

   /* allAuthorsHTML = allAuthorsHTML + '<li>' + '<a href="#author-' + author + '">' + '<span class="author-name">' + author  + '(' + allAuthors[author] + ')' +  '</span>' + '</a>' + '</li>';
    console.log(allAuthorsHTML); */

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }

  /* [NEW] add html from allAuthorsTagsHTML to authorListWrapper */
 
  authorListWrapper.innerHTML = templates.authorRigthtColumnLink(allAuthorsData);
  console.log(allAuthorsData);
  /* authorListWrapper.innerHTML = allAuthorsHTML;
  console.log (authorListWrapper); */
  

  const authors = document.querySelectorAll('.authors a');
  console.log(authors);

  for(let author of authors){
    author.addEventListener('click', authorClickHandler);
  }
    
}

generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract tag from the "href" constant */
  
  const author = href.replace('#author-', '');
  console.log(author);
  
  /* find all author links with class active */
  
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log (authorLinks);

  /* START LOOP: for each active tag link */
  
  for(let authorLink of authorLinks){

    /* remove class active */

    authorLink.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  
  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefAuthorLinks);

  /* START LOOP: for each found authorLink link */

  for(let hrefAuthorLink of hrefAuthorLinks){

    /* add class active */

    hrefAuthorLink.classList.add('active');
    console.log(hrefAuthorLink);

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */

  const authorLinks = document.querySelectorAll('.post .post-author a');
  console.log(authorLinks);
  
  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
    
  } 

}

addClickListenersToAuthors();

function addClickListenersToAuthorsRightColumn(){
  /* find all links to tags */

  const authorLinks = document.querySelectorAll('.authors a');
  console.log(authorLinks);
  
  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
    
  } 

}

addClickListenersToAuthorsRightColumn();


function calculateTagsParams(tags){
  const params = {min: '99999', max: '0'};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } 
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    
       
  }
  return params; 
}
 
function calculateTagClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  console.log (classNumber);

  return optCloudClassPrefix, classNumber;
}

function addClickListenersToTagsCloud(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.sidebar .list a');
  console.log(tagLinks);
  
  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

  // for(let tagLink of tagLinks){
  //   tagLink.addEventListener('click', tagClickHandler);
  // } 

}

addClickListenersToTagsCloud();

function generateTagsCloud(){
  
  /*  [NEW] create a new variable allTags with an empty object*/

  let allTags = {};
  
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optTagsListSelector); 
    console.log (tagsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log (articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    
    for(let tag of articleTagsArray){


      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log (linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);
     
      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
      console.log(allTags);
    }

    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP: for every article: */ 
    
  }
  
  /*[NEW] find list of tags in right column*/

  const tagList = document.querySelector('.tags');
  console.log(tagList);

  /* [NEW] add html from allTags to tagList */

  /* tagList.innerHTML = allTags.join(''); */
  console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */

  /* let allTagsHTML = ''; */
  const allTagsData = {tags: []};

  /*[NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */

    /* allTagsHTML = allTagsHTML + '<a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag  + '</a>' ; */
    
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  
  /* [NEW] add html from allTagsHTML to taglist */

 /* tagList.innerHTML = allTagsHTML;
  console.log (allTagsHTML); */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);

  const tags = document.querySelectorAll('.tags a');

  for(let tag of tags){
    tag.addEventListener('click', tagClickHandler);
  } 

}

generateTagsCloud();