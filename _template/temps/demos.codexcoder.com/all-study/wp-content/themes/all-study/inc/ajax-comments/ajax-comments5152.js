"undefined"!=typeof jQuery&&jQuery(document).ready(function(e){var t,r=e('<div id="comment-status"></div>'),n="#commentform",o="#respond",m=".comment-list",s=".woocommerce-noreviews",c="#review_form_wrapper";e(document).on("submit",n,function(i){i.preventDefault();var l=e(this);return m=e(c).length?".commentlist":m,e(r).remove(),e(n).prepend(r),e.ajax({beforeSend:function(t){t.setRequestHeader("If-Modified-Since","0"),e(r).html("<p>"+to_comment_msg.processing+"</p>")},type:"post",url:l.attr("action"),data:l.serialize(),dataType:"html",error:function(t,n){e(r).html("<p><strong>"+to_comment_msg.error_string+" : </strong>"+to_comment_msg.error[t.status]+"</p>")},success:function(n){var i=(i=n.replace(/(<\/?)html( .+?)?>/gi,"$1NOTHTML$2>",n)).replace(/(<\/?)body( .+?)?>/gi,"$1NOTBODY$2>",i),l=(i=e(i).find("#error-page"),e(n).find(m));return i.length?e(r).html(i.html()):l.length?(e(c).length?(o=s,t=to_comment_msg.success.review):(o="#respond",t=to_comment_msg.success.comment,e(o).parents("li.comment").length>0&&(e(o).insertAfter(m),e("#cancel-comment-reply-link").click())),e(m).length>0?e(m).replaceWith(l):(e(o).before(l),e(s).remove()),e(r).html(t),setTimeout(function(){e(r).remove(),e("#respond textarea").val("")},3e3)):e(r).html("<p><strong>"+to_comment_msg.error_string+" : </strong>"+to_comment_msg.error[408]+"</p>"),!1}}),!1})});