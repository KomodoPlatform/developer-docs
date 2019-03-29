# Komodo Documentation Style Guidelines

Welcome to the Komodo Documentation Style Guidelines. The following documentation provides guidance for Komodo team members as we work together to prepare quality technical documentation so that our customers have a pleasant coding experience.

## An Important Note Before We Begin

In beginning the process of creating templates for Komodo, I realize that we are maturing as a company, and that several points about where we are need to be made.

It is the nature of startups that they should be chaotic. Chaos is required for creativity, and one can argue that Komodo is creative at heart, if nothing else.

As any company grows in size and seeks to serve a customer, and thereby generate profit, Chaos can become a hinderance. Customers do not want to hand money to a company and receive a chaotic result. Rather, they want predictability. For the customer to be satisfied, Chaos must take a few steps back and allow room for Procedure to enter the picture.

For this reason, in creating templates for technical documentation I feel a sense of responsibility to make a few things clear, before we start writing down procedures.

We are, at heart, a creative company. With every existing customer of whom I am aware, they are primarily excited about Komodo because of our creativity. They wouldn't mind having a more predictable procedure as a part of their experience with us, but without the creativity, they may lose interest and go elsewhere.

In taking this time to create room for Procedure to become more present in our creative process, I want to make it clear that these templates are here to serve the customer. Therefore, the templates are here to serve creativity, and not the other way around.

If developers and other members of the team feel these templates do not serve the purpose of enhancing the customer experience by increasing our creative output, please let me know so that we can improve them immediately. They should make life easier, and I will want to know if that's not the case.

Thanks.

## General Considerations

### Different Parties in the Tech Docs Process

In making technical documentation, there are several parties involved. To get a better idea of how each team member fits into the picture one can look at the following cycle of team members and their activities:

- Someone thinks of an idea and proposes it
  - Could be a blockchain engineer, or a designer, or any other team member
- Someone creates the code to make it a reality
  - Can be a junior, mid-level, or senior developer
- Someone may review and revise the initial code
  - A lead or senior developer
- Testers test the code
  - Usually, one or two team members provide the initial testing
  - Afterwards, immediate and enthusiastic team members endure the rocky process of (very very) early public testing
- Someone documents all the ideas in a raw, unedited, and (very) unpolished form
  - This is often either the developer who created the code, or the tester who is assisting the developer
- Someone gathers all written information into one source and ensures the writing team has everything it needs
- Someone does an initial pass at cleaning up the documentation, and watches at all times for needed changes 
- A professional editor ensures voice, grammar, and styling accuracy
- Someone manages the website for documentation
- Someone places all polished documentation on the website, and ensures it is presented in its intended form
- Marketers promote the updates through various channels, and otherwise beautify the final product
  - This also includes our PR agency, which seeks to generate news articles about Komodo
- Sales and customer support agents monitor and assist community adoption
- Researchers observe and record community response with the intent to discover new ideas and improvements
  - This is often a cross function of the support team
  - Komodo also has associated members that perform specific UX/UI research and design
- Data analysts quantify these responses for actionable steps
  - Currently, no one is thoroughly performing this task, but the marketing team is working to fill this gap, and may need assistance from the support team
- Someone proposes improvements and new features
  - This is often a cross function of designers and blockchain engineers
- The cycle begins again, with new ideas discovered and/or proposed

## A Key Takeaway from this Cycle Analysis

The tasks to innovate and sell a new feature or product are too vast for any one team member to do alone. If every team member attempts to perform each task on the list, the team member will not be able to achieve a professional standard in any of the steps of this process.

For this reason, Komodo comes together as a team. Individual team members bring their strengths to the cycle, focusing on areas where they can contribute, and rely on other team members to perform tasks that are outside of the individual's scope.

This is important for our team to understand as we seek to improve Komodo's technical documentation.

## Dividing Responsibilities for Those Closest to Technical Documentation

The aspects of creating technical documentation largely revolves around the first half of the cycle:

- Someone creates the code to make it a reality
  - Can be a junior, mid-level, or senior developer
- Someone may review and revise the initial code
  - A lead or senior developer
- Testers test the code
  - Usually, one or two team members provide the initial testing
  - Afterwards, immediate and enthusiastic team members endure the rocky process of (very very) early public testing
- Someone document all the ideas in a raw, unedited, and (very) unpolished form
  - This is often either the developer who created the code, or the tester who is assisting the developer
- Someone gathers all written information into one source and ensures the writing team has everything it needs
- Someone does an initial pass at cleaning up the documentation, and watches at all times for needed changes 
- A professional editor ensures voice, grammar, and styling accuracy
- Someone manages the website for documentation
- Someone places all polished documentation on the website, and ensures it is presented in its intended form

This area of the cycle often begins with the developer and the tester.

### The Initial Effort to Explain a New Feature

The developer and tester are often the first to write down information about any new Komodo feature.

They are not required to be professional writers as a part of their job. They are welcome to write with untrained English and amateur writing skills, so long as the raw documentation is basically understandable and pleasantly formatted.

On the other hand, the developer and testers are required to ensure that all necessary information is documented. No one will know what a feature is for, nor how it can be used, if the author of the feature does not take time to thoroughly explain it, or to delegate a tester or other team member to assist in this endeavor.

Their first attempt at an explanation can include elements such as: 

- The general concept of their contribution (an introduction) and why it matters to the Komodo customer
- Detailed installation instructions and hardware/operating system requirements
- A detailed and thorough walkthrough showing step-by-step how the feature would work
- A thorough explanation of each method (rpc)
  - This includes explanations about:
    - How the individual method works
    - Why it is included in the software
    - What additional considerations there are when using it
    - A table showcasing the arguments it makes
    - Detailed examples showing the feature's use cases, including both terminal and curl input and output
- Tables of information about different values the feature can accept or produce
- Guidelines showing how the feature functions in different situations 

Often, as a part of this development process, developers and testers need to reach out to the immmediate community for trial and testing. This is a normal and important part of the Komodo team effort.

When performing these trials and tests, the developer and tester may create and post raw documentation on nearly any "quiet" website they wish. Suggested places include:

- Github
- Gitlab
- Pastebin
- docs.komodoplatform.com
- Google Docs
- Discord

#### A Quick Note About Website Postings

One might ask, what do we mean when we say, "quiet"?

By "quiet," we mean that these documents should not be posted on outlets that are intended and used for viral social disbursal. For example, websites that are discouraged include: Twitter, Facebook, Reddit. 

The reason developers and testers should not post documentation on these websites is that these are outlets that are considered to be meant for "announcements." Posting here can give the mistaken impression to others in the industry that something a developer or tester said was given as a professional marketing announcement. This should be avoided. 

Developers who wish to publicly clarify specifically when and how a new feature was added should instead reach out to Komodo's marketing team for assistance. 

#### Continuing on with the Discussion

As the developer and tester near completion of this phase of their work, they can begin looking through Komodo's existing documentation templates to ensure that they have noted as much required and relevant information as possible. 

The templates are provided as a guideline and to speed up the process. If at any point in time the developer or tester feels that the templates either do not fit for the current feature, or otherwise are limiting their creative process, the templates should not be seen as an obstacle. The templates exist to help the creative process, not to hinder it, and if they are not helping, they can be set aside.

On the other hand, if the raw documentation is being created for an existing feature that is already present on the developers.komodoplatform.com website, then it is often very helpful if the raw documentation is created as a pull request over the existing documentation. In these cases, the process of adding documentation is dramatically enhanced for both the developer/tester and writer/steward if the developer/tester simply writes their corrections directly into the relevant section of the documentation.

Once a thorough and detailed effort to create raw documentation for this feature is created, and once the feature's code is in a state of general reliability, the next step in the process begins. Here, the developer calls on the writers and other technical-documentation stewards to begin editing and adding these documents to the existing body of documentation.

#### Not All Documentation Needs to be Turned Into a Final Product

For Komodo to function as a company, we must pick and choose which problems we will solve. 

We are not a large team, and we must allocate our resources intelligently. 

The developer and tester are the first to determine whether a raw document needs to be pushed into a final form, or whether it can be placed in an unpolished location for the foreseeable future.

For example, the Komodo developers maintain on Github a list of COIN configurations, and also of specific combinations of assets-chain launch parameters, that have not yet been added to the public facing website (via developers.komodoplatform.com).

No complaints have arisen from this situation, and therefore it may never be necessary to attempt to maintain these in a more public-facing location. 

Because the developers know the features most thoroughly, they are the first to decide which aspects can remain non-professionally documented, and which should be pushed forward.

It may help to keep in mind this general principle of design: less is more.

### Turning Raw Documentation Into a Final Product

A writer and technical-documentation steward are responsible for reviewing the raw documentation, ensuring that all relevant information is present, clarifying and improving the documentation's presentation, and pushing this material into a public location.

Just as a developer and tester are not required to write in professional English, writers are not required to discover or understand how the feature functions on a technically professional level. So long as they understand the general idea, this is sufficient. 

If raw information is missing from the content available to the writer, the writer should be able to turn to the developer and testers for assistance, and should not be expected to discover the missing information on their own.

In turning the raw documentation into a professional format, the writer and technical-documentation steward's responsibilities may include the following:

- Following existing, raw, step-by-step instructions on their local computer to visualize the feature in action
  - If raw documentation is not sufficient for the writer to achieve a full walkthrough, the writer should note the missing information or errors to the developers and testers
  - After alerting the relevant parties of the issue, the writer is free to continue performing their work to the best of their abilities without matching their writing with on-screen visuals of the feature
  - This compromise between loose testing/visualization and active writing productivity helps to keep the writer moving through their assignment
- Ensuring that the information available is sufficient for a customer (such as a GUI developer or otherwise)
- Adjusting and improving the format of the raw documentation to maintain a professional presentation across the entire site
- Removing content that, in agreement with the Komodo team developers, is deemed to be superfluous to the customer
- Adjusting linguistics, voice, grammar, and other aspects of professional writing and presentation style
- Using simple technical formatting (typically `MarkDown`) to enhance presentation
- Preparing the documents through Github for presentation on the website
- Confirming with all technical experts (Komodo developers and testers) that any changes made did not adversely affect the explanation of the feature
- Pushing this content to the appropriate public location
  - Currently, we are solely focused on developers.komodoplatform.com

Once the documentation is on the website, it is in the hands of the website maintainer and marketing team to continue the technical documentation's ability to enhance the customer experience. 

### On Improving Team Speed

The aspect of passing work from one team member to another is an area where the Komodo team has had frequent delays. 

The issue is most pronounced when a team member sends partial or incomplete information to the other team member. 

For example, when a developer passes to a writer incomplete raw documentation, the writer has no way of knowing that the documentation is incomplete until they have thoroughly explored it. 

Upon discovering that the documentation is incomplete, the writer then must write a message to the developer requesting the missing information, and explaining what's missing. 

The developer must then read the request, ask any additional questions, stop other tasks, and procede to find the missing information.

Once they're done, they then write yet another message and pass the raw documentation back.

This laborious sequence is an understandable part of the creative process, and indeed it is included in the task outlines above. However, it is important to note that the aspect of passing the task back and forth is very time consuming. 

When it can be avoided, team members should make reasonable efforts to do so. 

Likewise, if a writer does not adequately read the raw material before asking questions of the developer, the writer can also cause the developer to spend time inefficiently answering questions that were already answered. 

An ideal scenario is as follows:

- The developer and tester creates initial raw documentation
- The developer and tester write down everything they do as individuals to make the feature work, in thorough detail
- The developer and tester open the feature up to the community, and use the testing process to improve the raw documentation
- In finalizing the raw documentation, the developer and tester consult the templates to check if there is more information that can be added
- If necessary, the developer and tester can format their raw content into the templates to ensure that no information is missing
  - This also may help during the community testing phase, as the templates do help to clarify the walkthrough process and other elements
- The developer/tester pass the raw documentation on to the writer and other technical-documentation stewards
- At this point, the developer and tester move on to other tasks
- The writer and steward read the raw documentation in detail
- The writer and steward follow through any walkthroughs and examples of the documentation on their own hardware
- While following the walkthroughs and examples, the writer and steward take notes of any questions they have
- If at any point the writer and steward discover an error or missing information that inhibits their ability to continue using the software while performing their work, they are free to abandon the software and continue working only from the raw material alone
- Once the writer or steward has finished creating their questions, they present all of their questions and concerns in a single document or message to the developer or tester
- While waiting for the developer/tester to read and respond to the message, the writer and steward should move on to other tasks
- Assuming the matter is not pressing, then on a time table determined by the developer and tester, these team members address all questions in one batch process
- When they are finished, they pass their notes back to the writer and/or steward, and then resume work
- There is likely a short conversation here to help clarify any missing points
- From here, the writer and steward should be in a position to push the documentation to the final form, and they do so
- Once they are finished, or nearly so (perhaps a few questions they hadn't thought of arise), the writer and steward send the finalized documents back to the developer/tester for final review
- As a part of the final review, they include any final questions as inline comments
- The developer and tester read through the entire document to ensure that nothing was changed in any manner that would adversely affect the nature of the feature
- The developer and tester answer any final questions, perhaps with a brief conversation with the writer
- The writer/steward makes any final changes, and then pushes the content to the public-facing website
- At this point, the feature's documentation should be finished

Naturally, one concern a developer has at this point is that of changes that occur as a result of customer and audience adoption. 

There are two types of changes: Those that are "Mission Critical", and those that are not.

Changes that are mission critical are those that could cause a customer to be frustrated, or even for a customer to lose funds. If information is inaccurate and will lead a customer astray, this is "Mission "Critical."

On the other hand, a change that is not mission critical could be information that should have been added, but the lack thereof would not cause the customer any degree of frustration.

Mission Critical changes should be dealt with immediately. All parties involved, both developers/testers and writers/stewards, are equally responsible whenever there is an error. It is a team effort, and any non-emergency-related tasks should be dropped until the customer experience is corrected.

Non-mission critical changes only require a simple pull request on Github with the proposed corrections. The developer/tester should write right over the top of any errors, and only use aside comments, such as `<!--FIXME-->` statements, as a last resort or for questions. The writer/steward will fix this at their leisure and include the changes in the next appropriate update.

### Tips and Warnings

If the reader is at all familiar with the world of the creative arts, s/he will no doubt recall a time when they saw an amateur performance that relied too heavily on gimmicks and tricks to gain attention.

In the world of painters, the trick to gain the audience's attention is to put a "highlight", that is, a small speck of almost-white paint, in a spot where they want the audience to look.

When an amateur places these highlights everywhere throughout the painting, it becomes painful to look at.

A more experienced painter can come along and remove these highlights, and thereby dramatically improve the overall effect.

The same creative issues exist with music (high and loud notes), creative writing (exclamation points!), dance (leaps and fast movements), and other creative arts.

By reducing the number of times we seek to rapidly grab the audience's attention, we increase their appreciation of the few moments when we do. 

We should try to keep this principle in mind when creating Tips and Warnings.

If we have warnings and tips all over the place, the reader will likely get annoyed.

Try to keep the total number of tips in any document as low as you possible can.

When tempted to make a tip, ask yourself a few questions:

Can this instead go in a different section, such as the walkthrough, or must this content go here?

Can I make this a small (###, ####, or #####) highlighted section of its own instead?

Do I really need to have this separate from other relevant information, or can I simply include it as a part of the relevant explanation?

Do I want the reader to feel alarmed while reading this? Or can I communicate this in a way that does not jolt them out of their comfort?

Can I make this tip, or warning, very, very short, and then encourage the reader to read another section elsewhere for more information? 

### Final Notes

They say that in startups, it is not the most creative team that wins in the end, but the team that learns fastest. 

From our first year of creating technical documentation we have all learned a few things.

It is my hope that we will continue learning, from each other, and from our customers. Thank you. Please reach out if you have any questions during this process; I will be happy to assist you.
