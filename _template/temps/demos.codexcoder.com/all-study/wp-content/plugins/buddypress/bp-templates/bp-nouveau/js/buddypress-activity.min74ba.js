window.bp=window.bp||{},function(r,g){"undefined"!=typeof BP_Nouveau&&(r.Nouveau=r.Nouveau||{},r.Nouveau.Activity={start:function(){this.setupGlobals(),this.addListeners()},setupGlobals:function(){this.just_posted=[],this.current_page=1,this.mentions_count=Number(g(r.Nouveau.objectNavParent+' [data-bp-scope="mentions"]').find("a span").html())||0,this.heartbeat_data={newest:"",highlights:{},last_recorded:0,first_recorded:0,document_title:g(document).prop("title")}},addListeners:function(){g("#buddypress").on("bp_heartbeat_send",this.heartbeatSend.bind(this)),g("#buddypress").on("bp_heartbeat_tick",this.heartbeatTick.bind(this)),g('#buddypress [data-bp-list="activity"]').on("click","li.load-newest, li.load-more",this.injectActivities.bind(this)),g("#buddypress [data-bp-list]").on("bp_ajax_request",this.updateRssLink),g("#buddypress").on("bp_ajax_request",'[data-bp-list="activity"]',this.scopeLoaded.bind(this)),g('#buddypress [data-bp-list="activity"]').on("bp_ajax_append",this.hideComments),g('#buddypress [data-bp-list="activity"]').on("click",".show-all",this.showComments),g('#buddypress [data-bp-list="activity"]').on("click",".activity-item",r.Nouveau,this.activityActions),g(document).on("keydown",this.commentFormAction)},heartbeatSend:function(t,e){this.heartbeat_data.first_recorded=g("#buddypress [data-bp-list] [data-bp-activity-id]").first().data("bp-timestamp")||0,(0===this.heartbeat_data.last_recorded||this.heartbeat_data.first_recorded>this.heartbeat_data.last_recorded)&&(this.heartbeat_data.last_recorded=this.heartbeat_data.first_recorded),e.bp_activity_last_recorded=this.heartbeat_data.last_recorded,g("#buddypress .dir-search input[type=search]").length&&(e.bp_activity_last_recorded_search_terms=g("#buddypress .dir-search input[type=search]").val()),g.extend(e,{bp_heartbeat:r.Nouveau.getStorage("bp-activity")})},heartbeatTick:function(t,e){var a,i,s=r.Nouveau.objects,n=r.Nouveau.getStorage("bp-activity","scope"),d=this;void 0!==e&&e.bp_activity_newest_activities&&(this.heartbeat_data.newest=g.trim(e.bp_activity_newest_activities.activities)+this.heartbeat_data.newest,this.heartbeat_data.last_recorded=Number(e.bp_activity_newest_activities.last_recorded),e=g(this.heartbeat_data.newest).filter(".activity-item"),a=Number(e.length),s.push("mentions"),"all"===n?(g.each(e,function(t,a){a=g(a),g.each(s,function(t,e){-1!==g.inArray("bp-my-"+e,a.get(0).classList)&&(void 0===d.heartbeat_data.highlights[e]?d.heartbeat_data.highlights[e]=[a.data("bp-activity-id")]:-1===g.inArray(a.data("bp-activity-id"),d.heartbeat_data.highlights[e])&&d.heartbeat_data.highlights[e].push(a.data("bp-activity-id")))})}),i=new RegExp("bp-my-("+s.join("|")+")","g"),this.heartbeat_data.newest=this.heartbeat_data.newest.replace(i,""),g(r.Nouveau.objectNavParent+' [data-bp-scope="all"]').find("a span").html(a)):(this.heartbeat_data.highlights[n]=[],g.each(e,function(t,e){d.heartbeat_data.highlights[n].push(g(e).data("bp-activity-id"))})),g.each(s,function(t,e){var a;void 0!==d.heartbeat_data.highlights[e]&&d.heartbeat_data.highlights[e].length&&(a=0,"mentions"===e&&(a=d.mentions_count),g(r.Nouveau.objectNavParent+' [data-bp-scope="'+e+'"]').find("a span").html(Number(d.heartbeat_data.highlights[e].length)+a))}),s.pop(),g(document).prop("title","("+a+") "+this.heartbeat_data.document_title),g('#buddypress [data-bp-list="activity"] li').first().hasClass("load-newest")?(i=g('#buddypress [data-bp-list="activity"] .load-newest a').html(),g('#buddypress [data-bp-list="activity"] .load-newest a').html(i.replace(/([0-9]+)/,a))):g('#buddypress [data-bp-list="activity"] ul.activity-list').prepend('<li class="load-newest"><a href="#newest">'+BP_Nouveau.newest+" ("+a+")</a></li>"),g('#buddypress [data-bp-list="activity"]').trigger("bp_heartbeat_pending",this.heartbeat_data))},injectActivities:function(e){var a,i,t,s,n,d=r.Nouveau.getStorage("bp-activity"),o=d.scope||null,d=d.filter||null;g(e.currentTarget).hasClass("load-newest")?(e.preventDefault(),g(e.currentTarget).remove(),t=g.parseHTML(this.heartbeat_data.newest),g.each(t,function(t,e){"LI"===e.nodeName&&g(e).hasClass("just-posted")&&g("#"+g(e).prop("id")).length&&g("#"+g(e).prop("id")).remove()}),g(e.delegateTarget).find(".activity-list").prepend(this.heartbeat_data.newest).trigger("bp_heartbeat_prepend",this.heartbeat_data),this.heartbeat_data.newest="","all"===o&&g(r.Nouveau.objectNavParent+' [data-bp-scope="all"]').find("a span").html(""),"mentions"===o&&(r.Nouveau.ajax({action:"activity_clear_new_mentions"},"activity"),this.mentions_count=0),g(r.Nouveau.objectNavParent+' [data-bp-scope="'+o+'"]').find("a span").html(""),void 0!==this.heartbeat_data.highlights[o]&&(this.heartbeat_data.highlights[o]=[]),setTimeout(function(){g(e.delegateTarget).find("[data-bp-activity-id]").removeClass("newest_"+o+"_activity")},3e3),g(document).prop("title",this.heartbeat_data.document_title)):g(e.currentTarget).hasClass("load-more")&&(a=+Number(this.current_page)+1,i=this,t="",n=(s=g(e.currentTarget).children().first())?r.Nouveau.getLinkParams(s.prop("href"),"offset_lower"):0,e.preventDefault(),s.addClass("loading"),this.just_posted=[],g(e.delegateTarget).children(".just-posted").each(function(){i.just_posted.push(g(this).data("bp-activity-id"))}),g("#buddypress .dir-search input[type=search]").length&&(t=g("#buddypress .dir-search input[type=search]").val()),r.Nouveau.objectRequest({object:"activity",scope:o,filter:d,search_terms:t,page:a,method:"append",exclude_just_posted:this.just_posted.join(","),offset_lower:n,target:"#buddypress [data-bp-list] ul.bp-list"}).done(function(t){!0===t.success&&(g(e.currentTarget).remove(),i.current_page=a)}))},hideComments:function(t){var a,i,s,n,t=g(t.target).find(".activity-comments");t.length&&t.each(function(t,e){n=g(e).children("ul"),(i=g(n).find("li")).length&&(a=g(e).closest(".activity-item"),s=g("#acomment-comment-"+a.data("bp-activity-id")+" span.comment-count").html()||" ",i.each(function(t,e){t<i.length-5&&(g(e).addClass("bp-hidden").hide(),t||void 0!==(t=a.data("bpActivityId"))&&(t=parseInt(t,10),g(e).before('<li class="show-all"><button class="text-button" type="button" data-bp-show-comments-id="#activity-'+t+'/show-all/"><span class="icon dashicons dashicons-visibility" aria-hidden="true"></span> '+BP_Nouveau.show_x_comments.replace("%d",s)+"</button></li>")))}),g(n).children(".bp-hidden").length===g(n).children("li").length-1)&&g(n).find("li.show-all").length&&g(n).children("li").removeClass("bp-hidden").toggle()})},showComments:function(t){t.preventDefault(),g(t.target).addClass("loading"),setTimeout(function(){g(t.target).closest("ul").find("li").removeClass("bp-hidden").fadeIn(300,function(){g(t.target).parent("li").remove()})},600)},scopeLoaded:function(t,a){this.hideComments(t),this.current_page=1,"mentions"===a.scope&&void 0!==a.response.new_mentions?(g.each(a.response.new_mentions,function(t,e){g("#buddypress #activity-stream").find('[data-bp-activity-id="'+e+'"]').addClass("newest_mentions_activity")}),this.mentions_count=0):void 0!==this.heartbeat_data.highlights[a.scope]&&this.heartbeat_data.highlights[a.scope].length&&g.each(this.heartbeat_data.highlights[a.scope],function(t,e){g("#buddypress #activity-stream").find('[data-bp-activity-id="'+e+'"]').length&&g("#buddypress #activity-stream").find('[data-bp-activity-id="'+e+'"]').addClass("newest_"+a.scope+"_activity")}),this.heartbeat_data.newest="",g.each(g(r.Nouveau.objectNavParent+" [data-bp-scope]").find("a span"),function(t,e){0===parseInt(g(e).html(),10)&&g(e).html("")}),void 0!==this.heartbeat_data.highlights[a.scope]&&(this.heartbeat_data.highlights[a.scope]=[]),g(document).prop("title",this.heartbeat_data.document_title),setTimeout(function(){g("#buddypress #activity-stream .activity-item").removeClass("newest_"+a.scope+"_activity")},3e3)},activityActions:function(t){var a,i,s=t.data,n=g(t.target),d=g(t.currentTarget),e=d.data("bp-activity-id"),o=g(t.delegateTarget);if(((n=g(n).is("span")?g(n).closest("a"):n).hasClass("fav")||n.hasClass("unfav"))&&(a=n.hasClass("fav")?"fav":"unfav",t.preventDefault(),n.addClass("loading"),s.ajax({action:"activity_mark_"+a,id:e},"activity").done(function(t){var e;n.removeClass("loading"),!1!==t.success&&(n.fadeOut(200,function(){(g(this).find("span").first().length?g(this).find("span").first():g(this)).html(t.data.content),g(this).attr("data-bp-tooltip",t.data.content),"false"===g(this).attr("aria-pressed")?g(this).attr("aria-pressed","true"):g(this).attr("aria-pressed","false"),g(this).fadeIn(200)}),"fav"==a?(void 0===t.data.directory_tab||g(s.objectNavParent+' [data-bp-scope="favorites"]').length||g(s.objectNavParent+' [data-bp-scope="all"]').after(t.data.directory_tab),n.removeClass("fav"),n.addClass("unfav")):"unfav"==a&&((e=g('[data-bp-user-scope="favorites"]').hasClass("selected")||g(s.objectNavParent+' [data-bp-scope="favorites"]').hasClass("selected"))&&d.remove(),void 0!==t.data.no_favorite&&(g(s.objectNavParent+' [data-bp-scope="all"]').length&&g(s.objectNavParent+' [data-bp-scope="all"]').hasClass("selected")?g(s.objectNavParent+' [data-bp-scope="favorites"]').remove():e&&o.append(t.data.no_favorite)),n.removeClass("unfav"),n.addClass("fav")))})),n.hasClass("delete-activity")||n.hasClass("acomment-delete")||n.hasClass("spam-activity")||n.hasClass("spam-activity-comment")){var r,c,l,h,p=n.closest("[data-bp-activity-comment-id]"),u=p.data("bp-activity-comment-id"),m=0;if(t.preventDefault(),void 0!==BP_Nouveau.confirm&&!1===window.confirm(BP_Nouveau.confirm))return!1;n.addClass("loading");var v={action:"delete_activity",id:e,_wpnonce:s.getLinkParams(n.prop("href"),"_wpnonce"),is_single:n.closest("[data-bp-single]").length};(n.hasClass("spam-activity")||n.hasClass("spam-activity-comment"))&&(v.action="bp_spam_activity"),r=d,u&&(delete v.is_single,v.id=u,v.is_comment=!0,r=p),p.find("form").length&&d.find(".activity-comments").append(p.find("form")),s.ajax(v,"activity").done(function(t){if(n.removeClass("loading"),!1===t.success)r.prepend(t.data.feedback),r.find(".bp-feedback").hide().fadeIn(300);else{if(t.data.redirect)return window.location.href=t.data.redirect;u&&(m=1,t.data.deleted?(m=t.data.deleted.length,t.data.deleted.forEach(function(t){g('[data-bp-activity-comment-id="'+t+'"]').remove()})):g.each(p.find("li"),function(){m+=1}),c=d.find(".acomment-reply span.comment-count"),l=Number(c.html()-m),c.html(l),(h=d.find("li.show-all a")).length&&h.html(BP_Nouveau.show_x_comments.replace("%d",l)),0===l)&&d.removeClass("has-comments"),r.slideUp(300,function(){r.remove()}),u||d.data("bp-timestamp")!==s.Activity.heartbeat_data.last_recorded||(s.Activity.heartbeat_data.newest="",s.Activity.heartbeat_data.last_recorded=0)}})}if(n.closest("span").hasClass("activity-read-more")){var b=n.closest("div"),f=n.closest("span"),_=null;if(g(b).hasClass("activity-inner")?_=e:g(b).hasClass("acomment-content")&&(_=n.closest("li").data("bp-activity-comment-id")),!_)return t;t.preventDefault(),g(f).addClass("loading"),s.ajax({action:"get_single_activity_content",id:_},"activity").done(function(t){g(f).removeClass("loading"),b.parent().find(".bp-feedback").length&&b.parent().find(".bp-feedback").remove(),!1===t.success?(b.after(t.data.feedback),b.parent().find(".bp-feedback").hide().fadeIn(300)):g(b).slideUp(300).html(t.data.contents).slideDown(300)})}if(n.hasClass("acomment-reply")||n.parent().hasClass("acomment-reply")){var y=g("#ac-form-"+e);if(_=e,t.preventDefault(),!y.length)return(v=n.closest("li.activity").find(".activity-meta a.view").prop("href"))&&(window.location.href=v),!1;n.parent().hasClass("acomment-reply")&&n.parent(),n.closest("li").data("bp-activity-comment-id")&&(_=n.closest("li").data("bp-activity-comment-id")),y.removeClass("root"),g(".ac-form").hide(),g.each(y.children("div"),function(t,e){g(e).hasClass("error")&&g(e).remove()}),_===e?(g('[data-bp-activity-id="'+_+'"] .activity-comments').append(y),y.addClass("root")):g('[data-bp-activity-comment-id="'+_+'"]').append(y),y.slideDown(200),n.attr("aria-expanded","true"),g.scrollTo(y,500,{offset:-100,easing:"swing"}),g("#ac-form-"+e+" textarea").trigger("focus")}n.hasClass("ac-reply-cancel")&&(g(n).closest(".ac-form").slideUp(200),g(".acomment-reply").attr("aria-expanded","false"),t.preventDefault()),"ac_form_submit"===n.prop("name")&&(y=n.closest("form"),_=e,t.preventDefault(),n.closest("li").data("bp-activity-comment-id")&&(_=n.closest("li").data("bp-activity-comment-id")),i=g(y).find("textarea").first(),n.addClass("loading").prop("disabled",!0),i.addClass("loading").prop("disabled",!0),v={action:"new_activity_comment",_wpnonce_new_activity_comment:g("#_wpnonce_new_activity_comment_"+e).val(),comment_id:_,form_id:e,content:i.val()},g("#_bp_as_nonce_"+e).val()&&(v["_bp_as_nonce_"+e]=g("#_bp_as_nonce_"+e).val()),s.ajax(v,"activity").done(function(t){var e,a;n.removeClass("loading"),i.removeClass("loading"),g(".acomment-reply").attr("aria-expanded","false"),!1===t.success?y.append(g(t.data.feedback).hide().fadeIn(200)):(e=y.parent(),a=g.trim(t.data.contents),y.fadeOut(200,function(){0===e.children("ul").length&&(e.hasClass("activity-comments")?e.prepend("<ul></ul>"):e.append("<ul></ul>")),e.children("ul").append(g(a).hide().fadeIn(200)),g(y).find("textarea").first().val(""),e.parent().addClass("has-comments")}),l=Number(g(d).find("a span.comment-count").html()||0)+1,g(d).find("a span.comment-count").html(l),(h=g(d).find(".show-all a"))&&h.html(BP_Nouveau.show_x_comments.replace("%d",l))),n.prop("disabled",!1),i.prop("disabled",!1)}))},commentFormAction:function(t){var e,a;return(t=t||window.event).target?e=t.target:t.srcElement&&(e=t.srcElement),3===e.nodeType&&(e=e.parentNode),!0!==t.altKey&&!0!==t.metaKey&&"TEXTAREA"===e.tagName&&g(e).hasClass("ac-input")?void(27===(a=t.keyCode||t.which)&&!1===t.ctrlKey?"TEXTAREA"===e.tagName&&g(e).closest("form").slideUp(200):t.ctrlKey&&13===a&&g(e).val()&&g(e).closest("form").find("[type=submit]").first().trigger("click")):t},updateRssLink:function(t,e){e=e.response.feed_url||"";e&&g("body:not(.bp-user) #activity-rss-feed").length&&g("#activity-rss-feed").find("a").first().prop("href",e)}},r.Nouveau.Activity.start())}(window.bp,jQuery);