frappe.pages['gradebook'].on_page_load = function(wrapper) {
	new PageContent(wrapper);
}

PageContent = Class.extend({
	init: function(wrapper){
		page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Gradebook',
			single_column: true
		});
		this.make();

	},
	make: function(){
		let htmlContent = `
		<div class="page-content">    <div class="workflow-button-area btn-group pull-right hide"></div>    <div class="clearfix"></div>   <div class="row layout-main" style="">
					<div class="col-lg-2 layout-side-section"><div class="list-sidebar overlay-sidebar hidden-xs hidden-sm"><ul class="list-unstyled sidebar-menu user-actions hide">  <li class="divider"></li> </ul> <ul class="list-unstyled sidebar-menu">  <div class="sidebar-section views-section hide">   <li class="sidebar-label">   </li>   <div class="current-view">    <li class="list-link">     <a class="btn btn-default btn-sm list-sidebar-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">      <span class="selected-view ellipsis">      </span>      <span>       <svg class="icon icon-xs">        <use href="#icon-select"></use>       </svg>      </span>     </a>     <ul class="dropdown-menu views-dropdown" role="menu">     </ul>    </li>    <li class="sidebar-action">     <a class="view-action"></a>    </li>   </div>  </div>   <div class="sidebar-section filter-section">   <li class="sidebar-label">    Filter By   </li>    <div class="list-group-by">
			<div class="list-group-by-fields"><li class="group-by-field list-link">
					<a class="btn btn-default btn-sm list-sidebar-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-label="Assigned To" data-fieldname="assigned_to" data-fieldtype="undefined" href="#" onclick="return false;">
						<span class="ellipsis">Assigned To</span>
						<span><svg class="icon  icon-xs" style="">
			<use class="" href="#icon-select"></use>
		</svg></span>
					</a>
					<ul class="dropdown-menu group-by-dropdown" role="menu">
					</ul>
			</li><li class="group-by-field list-link">
					<a class="btn btn-default btn-sm list-sidebar-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-label="Created By" data-fieldname="owner" data-fieldtype="undefined" href="#" onclick="return false;">
						<span class="ellipsis">Created By</span>
						<span><svg class="icon  icon-xs" style="">
			<use class="" href="#icon-select"></use>
		</svg></span>
					</a>
					<ul class="dropdown-menu group-by-dropdown" role="menu">
					</ul>
			</li></div>
			<li class="add-list-group-by sidebar-action">
				<a class="add-group-by">
					Edit Filters
				</a>
			</li>
		</div>    <div class="list-tags">    <li class="list-stats list-link">     <a class="btn btn-default btn-sm list-sidebar-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">      <span>Tags</span>      <span>       <svg class="icon icon-xs">        <use href="#icon-select"></use>       </svg>      </span>     </a>     <ul class="dropdown-menu list-stats-dropdown" role="menu">      <div class="dropdown-search">       <input type="text" placeholder="Search" data-element="search" class="form-control input-xs">      </div>      <div class="stat-result">      </div>     </ul>    </li>    <li class="sidebar-action show-tags">     <a class="list-tag-preview">Show Tags</a>    </li>   </div>  </div>   <div class="sidebar-section save-filter-section">   <li class="sidebar-label">    Save Filter   </li>   <li class="list-filters list-link">
			<li class="input-area"><div class="frappe-control input-max-width" data-fieldtype="Data">
				<div class="form-group">
					<div class="clearfix">
						<label class="control-label" style="padding-right: 0px;"></label>
						<span class="help"></span>
					</div>
					<div class="control-input-wrapper">
						<div class="control-input"><input type="text" autocomplete="off" class="input-with-feedback form-control input-xs" maxlength="140" data-fieldtype="Data" placeholder="Filter Name"></div>
						<div class="control-value like-disabled-input" style="display: none;"></div>
						<p class="help-box small text-muted"></p>
					</div>
				</div>
			<span class="tooltip-content">undefined</span></div><div class="form-group frappe-control input-max-width hide-control" data-fieldtype="Check">
			<div class="checkbox">
				<label>
					<span class="input-area"><input type="checkbox" autocomplete="off" class="input-with-feedback" data-fieldtype="Check" placeholder=""></span>
					<span class="disp-area" style="display: none;"><input type="checkbox" disabled="" class="disabled-deselected"></span>
					<span class="label-area">Is Global</span>
					<span class="ml-1 help"></span>
				</label>
				<p class="help-box small text-muted"></p>
			</div>
		<span class="tooltip-content">undefined</span></div></li>
			<li class="sidebar-action">
				<a class="saved-filters-preview" style="display: none;">Hide Saved</a>
			</li>
			<div class="saved-filters" style=""></div>
		</li> </div></ul> </div></div>
					<div class="col layout-main-section-wrapper">
						<div class="layout-main-section frappe-card"><div class="page-form flex"><div class="standard-filter-section flex"><div class="form-group frappe-control input-max-width col-md-2" data-fieldtype="Data" data-fieldname="name" title="" data-original-title="ID"><input type="text" autocomplete="off" class="input-with-feedback form-control input-xs" maxlength="140" data-fieldtype="Data" data-fieldname="name" placeholder="ID"><span class="tooltip-content">name</span></div><div class="form-group frappe-control input-max-width col-md-2" data-fieldtype="Link" data-fieldname="quiz" title="" data-original-title="Quiz"><div class="link-field ui-front" style="position: relative;">
			<div class="awesomplete"><input type="text" class="input-with-feedback form-control input-xs" maxlength="140" data-fieldtype="Link" data-fieldname="quiz" placeholder="Quiz" data-target="Hublms Quiz" autocomplete="off" aria-expanded="false" aria-owns="awesomplete_list_2" role="combobox"><ul hidden="" role="listbox" id="awesomplete_list_2"></ul><span class="visually-hidden" role="status" aria-live="assertive" aria-atomic="true">Begin typing for results.</span></div>
			
		</div><span class="tooltip-content">quiz</span></div><div class="form-group frappe-control input-max-width col-md-2" data-fieldtype="Link" data-fieldname="member" title="" data-original-title="Member"><div class="link-field ui-front" style="position: relative;">
			<div class="awesomplete"><input type="text" class="input-with-feedback form-control input-xs" maxlength="140" data-fieldtype="Link" data-fieldname="member" placeholder="Member" data-target="User" autocomplete="off" aria-expanded="false" aria-owns="awesomplete_list_3" role="combobox"><ul hidden="" role="listbox" id="awesomplete_list_3"></ul><span class="visually-hidden" role="status" aria-live="assertive" aria-atomic="true">Begin typing for results.</span></div>
			
		</div><span class="tooltip-content">member</span></div><div class="form-group frappe-control input-max-width col-md-2" data-fieldtype="Data" data-fieldname="member_name" title="" data-original-title="Member Name"><input type="text" autocomplete="off" class="input-with-feedback form-control input-xs" maxlength="140" data-fieldtype="Data" data-fieldname="member_name" placeholder="Member Name"><span class="tooltip-content">member_name</span></div></div><div class="filter-section flex"><div class="filter-selector">
			<div class="btn-group">
				<button class="btn btn-default btn-sm filter-button" data-original-title="" title="">
					<span class="filter-icon">
						<svg class="es-icon es-line  icon-sm" style="">
			<use class="" href="#es-line-filter"></use>
		</svg>
					</span>
					<span class="button-label hidden-xs">
					Filter
					<span>
				</span></span></button>
				<button class="btn btn-default btn-sm filter-x-button" title="Clear all filters">
					<span class="filter-icon">
						<svg class="es-icon es-line  icon-sm" style="">
			<use class="" href="#es-small-close"></use>
		</svg>
					</span>
				</button>
			</div>
		</div><div class="sort-selector">  <div class="btn-group">   <button class="btn btn-default btn-sm btn-order" data-value="desc" title="descending">    <span class="sort-order">     <svg class="icon icon-sm">      <use href="#icon-sort-descending"></use>     </svg>    </span>   </button>   <button type="button" class="btn btn-default btn-sm sort-selector-button" data-toggle="dropdown">    <span class="dropdown-text">Created On</span>    <ul class="dropdown-menu dropdown-menu-right">          <li>      <a class="dropdown-item option" data-value="modified">       Last Updated On      </a>     </li>          <li>      <a class="dropdown-item option" data-value="member_name">       Member Name      </a>     </li>          <li>      <a class="dropdown-item option" data-value="name">       ID      </a>     </li>          <li>      <a class="dropdown-item option" data-value="creation">       Created On      </a>     </li>          <li>      <a class="dropdown-item option" data-value="idx">       Most Used      </a>     </li>          <li>      <a class="dropdown-item option" data-value="quiz">       Quiz      </a>     </li>          <li>      <a class="dropdown-item option" data-value="member">       Member      </a>     </li>          <li>      <a class="dropdown-item option" data-value="score">       Score      </a>     </li>          <li>      <a class="dropdown-item option" data-value="score_out_of">       Score Out Of      </a>     </li>          <li>      <a class="dropdown-item option" data-value="percentage">       Percentage      </a>     </li>          <li>      <a class="dropdown-item option" data-value="passing_percentage">       Passing Percentage      </a>     </li>         </ul>   </button>  </div> </div></div></div><div class="frappe-list"><div class="result">
			<header class="level list-row-head text-muted">
				<div class="level-left list-header-subject">
					<div class="list-row-col ellipsis list-subject level  ">
			<input class="level-item list-check-all" type="checkbox" title="Select All">
			<span class="level-item" data-sort-by="member_name" title="Click to sort by Member Name">
				Member Name
			</span>
		</div>
			<div class="list-row-col ellipsis hidden-xs tag-col hide "><span>
						Tag
					</span></div>
			<div class="list-row-col ellipsis hidden-xs  "><span data-sort-by="quiz" title="Click to sort by Quiz">
						Quiz 1
					</span></div>
			<div class="list-row-col ellipsis hidden-xs  "><span data-sort-by="member" title="Click to sort by Member">
						Quiz 2
					</span></div>
			<div class="list-row-col ellipsis hidden-xs  "><span data-sort-by="name" title="Click to sort by ID">
						Quiz 3
					</span></div>
				</div>
				<div class="level-left checkbox-actions" style="display: none;">
					<div class="level list-subject">
						<input class="level-item list-check-all" type="checkbox" title="Select All">
						<span class="level-item list-header-meta"></span>
					</div>
				</div>
				<div class="level-right">
					
			<span class="list-count"><span>4 of 4</span></span>
			<span class="level-item list-liked-by-me hidden-xs">
				<span title="Liked by me">
					<svg class="es-icon es-line  icon-sm" style="">
			<use class="like-icon" href="#es-solid-heart"></use>
		</svg>
				</span>
			</span>
		
				</div>
			</header>
		<div class="freeze flex justify-center align-center text-muted" style="display: none;">
				Loading...
			</div>
			
		
			
			
			<div class="list-row-container" tabindex="1">
				<div class="level list-row">
					<div class="level-left ellipsis">
						
						<div class="list-row-col ellipsis list-subject level ">
							
						<span class="level-item select-like">
							<input class="list-row-checkbox" type="checkbox" data-doctype="Hublms Quiz Submission" data-name="6a11f97690">
						</span>
						<span class="level-item bold ellipsis">
							<a class="ellipsis" data-doctype="Hublms Quiz Submission" data-name="6a11f97690" href="/app/hublms-quiz-submission/6a11f97690" title="Student Two">Student Two</a>
						</span>
					
						</div>
					
							<div class="list-row-col tag-col hide hidden-xs ellipsis">
								<div class="tags-empty">-</div>
							</div>
						
						<div class="list-row-col ellipsis hidden-xs ">
							<span class="ellipsis" title="Satisfactory">
							<span class="filterable indicator-pill green ellipsis" data-filter="status,=,Satisfactory">
								<span class="ellipsis"> Satisfactory </span>
							</span>
							</span>
						</div>
					
						<div class="list-row-col ellipsis hidden-xs ">
							<span class="ellipsis" title="Not Graded">
							<span class="filterable indicator-pill gray ellipsis" data-filter="status,=,Not Graded">
								<a class="ellipsis" data-doctype="Hublms Quiz Submission" data-name="6a11f97690" href="/app/hublms-quiz-submission/6a11f97690" title=" Not Graded "> Not Graded </a>
							</span>
							</span>
						</div>
					
						<div class="list-row-col ellipsis hidden-xs ">
							<span class="ellipsis" title="Support">
							<span class="filterable indicator-pill yellow ellipsis" data-filter="status,=,Support">
								<span class="ellipsis"> Support </span>
							</span>
							</span>
						</div>
					
								</div>
								<div class="level-right text-muted ellipsis">
									
						<div class="level-item list-row-activity hidden-xs">
							<div class="hidden-md hidden-xs">
								
							</div>
							<span class="modified"><span class="frappe-timestamp  mini" data-timestamp="2024-03-05 04:24:56.972262" title="05-03-2024 04:24:56">49 m</span></span>
							<span class="comment-count d-flex align-items-center">
							<svg class="es-icon es-line  icon-sm" style="">
						<use class="" href="#es-line-chat-alt"></use>
					</svg>
							1</span>
							<span class="mx-2">·</span>
							<span class="list-row-like hidden-xs style=" margin-bottom:="" 1px;"="">
								
						<span class="like-action not-liked" data-liked-by="[]" data-doctype="Hublms Quiz Submission" data-name="6a11f97690" title="">
							<svg class="es-icon es-line  icon-sm" style="">
						<use class="like-icon" href="#es-solid-heart"></use>
					</svg>
						</span>
						<span class="likes-count">
							
						</span>
					
							</span>
						</div>
						<div class="level-item visible-xs text-right">
							
						</div>
		
					</div>
				</div>
			</div>

			<div class="list-row-container" tabindex="1">
				<div class="level list-row">
					<div class="level-left ellipsis">
						
						<div class="list-row-col ellipsis list-subject level ">
							
						<span class="level-item select-like">
							<input class="list-row-checkbox" type="checkbox" data-doctype="Hublms Quiz Submission" data-name="6a11f97690">
						</span>
						<span class="level-item bold ellipsis">
							<a class="ellipsis" data-doctype="Hublms Quiz Submission" data-name="6a11f97690" href="/app/hublms-quiz-submission/6a11f97690" title="Student One">Student One</a>
						</span>
					
						</div>
					
							<div class="list-row-col tag-col hide hidden-xs ellipsis">
								<div class="tags-empty">-</div>
							</div>
						
						<div class="list-row-col ellipsis hidden-xs ">
							<span class="ellipsis" title="Satisfactory">
							<span class="filterable indicator-pill green ellipsis" data-filter="status,=,Satisfactory">
								<span class="ellipsis"> Satisfactory </span>
							</span>
							</span>
						</div>
					
						<div class="list-row-col ellipsis hidden-xs ">
							<span class="ellipsis" title="Failed">
							<span class="filterable indicator-pill red ellipsis" data-filter="status,=,Failed">
								<span class="ellipsis"> Failed </span>
							</span>
							</span>
						</div>
					
						<div class="list-row-col ellipsis hidden-xs ">
							<span class="ellipsis" title="Support">
							<span class="filterable indicator-pill yellow ellipsis" data-filter="status,=,Support">
								<span class="ellipsis"> Support </span>
							</span>
							</span>
						</div>
					
								</div>
								<div class="level-right text-muted ellipsis">
									
						<div class="level-item list-row-activity hidden-xs">
							<div class="hidden-md hidden-xs">
								
							</div>
							<span class="modified"><span class="frappe-timestamp  mini" data-timestamp="2024-03-05 04:24:56.972262" title="05-03-2024 04:24:56">49 m</span></span>
							<span class="comment-count d-flex align-items-center">
							<svg class="es-icon es-line  icon-sm" style="">
						<use class="" href="#es-line-chat-alt"></use>
					</svg>
							1</span>
							<span class="mx-2">·</span>
							<span class="list-row-like hidden-xs style=" margin-bottom:="" 1px;"="">
								
						<span class="like-action not-liked" data-liked-by="[]" data-doctype="Hublms Quiz Submission" data-name="6a11f97690" title="">
							<svg class="es-icon es-line  icon-sm" style="">
						<use class="like-icon" href="#es-solid-heart"></use>
					</svg>
						</span>
						<span class="likes-count">
							
						</span>
					
							</span>
						</div>
						<div class="level-item visible-xs text-right">
							
						</div>
		
					</div>
				</div>
			</div>



		</div><div class="no-result text-muted flex justify-center align-center" style="display: none;">
			<div class="no-result text-muted flex justify-center align-center">
				<div class="msg-box no-border">
			<div>
				<img src="/assets/frappe/images/ui-states/list-empty-state.svg" alt="Generic Empty State" class="null-state">
			</div>
			<p>You haven't created a Hublms Quiz Submission yet</p>
			
			
		</div>
			</div>
		</div><div class="list-paging-area level" style="">
				<div class="level-left">
					<div class="btn-group">
						
							<button type="button" class="btn btn-default btn-sm btn-paging btn-info" data-value="20">
								20
							</button>
						
							<button type="button" class="btn btn-default btn-sm btn-paging" data-value="100">
								100
							</button>
						
							<button type="button" class="btn btn-default btn-sm btn-paging" data-value="500">
								500
							</button>
						
					</div>
				</div>
				<div class="level-right">
					<button class="btn btn-default btn-more btn-sm" style="display: none;">
						Load More
					</button>
				</div>
			</div></div></div>
						<div class="layout-footer hide"></div>
					</div>
				</div><div class="row list-skeleton" style="display: none;">
					<div class="col-lg-2">
						<div class="list-skeleton-box"></div>
					</div>
					<div class="col">
						<div class="list-skeleton-box"></div>
					</div>
				</div></div>
		`;
		// $(frappe.render_template(htmlContent,this)).appendTo(this.page.main);
		
		// $(frappe.render_template("gradebook", {})).appendTo(this.page.main);
		var data = {};
		frappe.call({
			method: "frappe.client.get_user_data",
			callback: function(response) {
				// Check if the request was successful
				if (!response.message) {
					console.error("Failed to fetch user data");
					return;
				}
				data = { users: response.message };
				$(frappe.render_template("gradebook", data)).appendTo(page.main);
				// Render the template with the fetched user data and append it to the main element of the page
			}
		});

	}
})