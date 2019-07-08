(Note: Please ensure that you have read the introduction to the technical-documentation templates before using this template: [link](https://github.com/KomodoPlatform/developer-docs/blob/dev/additional-assets/templates/001-Style-Guide.md))

# Introduction

::: tip
An optional tip. Please avoid using tips as much as possible.
Highly important tips, such as a request to reach out to the team before using the module on a production chain due to its experimental nature, or something similar
:::

The Name CryptoConditions (CC) module ... does what?

Explain the module at a general level. Try to explain it as though you are talking to a new customer, who may only be lightly familiar with coding and/or blockchain.

Here are some questions to consider:

What is the general idea of this module? What is it good for?

Is this module related to technology happening elsewhere in the industry? If so, what? For example, is this an implementation of code that many people in other blockchain communities want, and are trying to build, and we have it here now?

Why would someone want to try it?

What problem does this module solve? Please clearly describe the problem.  

Can you visualize in your head a customer using this feature? Why are they interested? Carry on a conversation with them in your head, as though you are trying to get them to use the feature. What points did you have to use to get them to make a purchase? Write down those notes here.

Are there any general technical points that you need to make? Is there something unique about the way that you use this module that needs to be mentioned here, and not in the Installation/Walkthrough/Other/RPC's sections?

Read through some of the existing CC documentation on developers.komodoplatform.com and see if your explanation is somewhere on par with what we already have.

::: tip
Any additional tips or after thoughts. Again, try to avoid using these, if at all possible.
:::

### Name CC Module Flow

* Insert first step here [insert relevant links to relevant method here](https://www.youtube.com/watch?v=C4_KDf4xhU8), and try to keep this and all others to one or two sentences 
* Add any additional notes about this here
* Capitalize the first letter of each point, but do not include a period at the end of each bullet point
* If you need to use two sentences, here is a method. Put a period after the first sentence, but end the second sentence with no period
* Avoid adding a preamble to your sentence. Rather, get right to the point, such as:
  * Create a new contract using the [insert_method](https://en.wikipedia.org/wiki/Le_Morte_d%27Arthur) method
* Use the `backticks` for data-related content, but don't use them when you are making a [data_related](https://ncase.me/trust/) link

## Installation

A brief introduction about the installation process. What are we about to accomplish as a user? Can you give me a one to three sentence warm up, so that I know I'm reading the right content?

### Requirements

* Tell me what operating systems I need
* Tell me what operating systems don't work
* Tell me what specific hardware requirements I need
* Is there anything else?

Any additional notes about requirements? Is there somewhere I can go to find out information, such as the Discord channel? Link it here, if so.

### Software Bundles Installation 

Tell me about software bundles. Pretend I don't know too much about computers or Komodo. I might be a community member who is a bit technically challenged. What am I downloading? Is it going to work via one simple download?

Tell me here that I'm going to download a link below.

[Link to Software Bundle Here](https://www.youtube.com/watch?v=heJmw-Dsp0A)

Should you tell me here that I don't need to read the next section, that I don't need to manually compile anything unless I really want to?

### Manually Compiling Software

Tell me here what I'm doing. Manually compiling, right? Assume that someone reading this may have skipped directly to this section and may not have read anything above.

Is there anything else I need to know?

Do you need to give me a broad overview of what I'm doing, so that if I get lost, I have a subconscious idea of where I am in the process and don't ever truly "feel" lost? That goes here.

#### Step One: Describe It

Keep in mind, triple headings ### show up in search results, but #### quadruple headings don't. We don't want our users to see headings for an installation walkthrough in the search results when they're actually searching for a method. So, keep those headings either to #### quadruple, or don't mention the name of a method (rpc) in a heading unless you are 100% certain you need to.

Pretend I'm not too good with programming, and maybe I'm new to Ubuntu Linux. Terminals are a new thing for me, although I'm a smart guy and can figure them out. Should you tell me here that I need to execute each line of the following code individually?

```bash
cd to whatever here
compile something here
```

Once i've done that, what should I do next? Make sure to make it clear, especially here at the beginning.

```bash
do something else
do something else
```

Should there be any output that I would see?

```json
{
    "output": "output"
}
```

Do you need to tell me anything about what I'm looking at?

Will I know without any help if I've reached the end of this section? Or should you give me a hint to know that things went well, or did not go well? Is there anything I can do to see/check how I did?

#### Next Section

Keep it up. Same as before.

#### Final Section

Do the final things:

```bash
final thing
```

Look for some final output:

```bash
output that shows me I'm done
```

Tell me I'm done with installation.

No need to give me congratulations or anything. I'm a professional. Keep it calm. I've got business to do, and we're just getting started.

#### Optional GUI Installation

Is there a Graphical User Interface (GUI) to install? Tell me about it. Don't assume that I know the meaning of the acronym GUI until you've explained it to me at least once. There's nothing so annoying as having acronyms that I don't understand all over the place. 

Is there a software bundle to install? The link will be below, right?:

[Link to Install GUI Here](https://www.thebeatles.com/)

I don't need to compile it manually right?

#### Compile the GUI Manually

I do want to compile the GUI manually. Tell me about it here.

Since I'm compiling it manually, I guess this time there's no need to be formal with the full name, Graphical User Interface (GUI). We can skip it and just use GUI from the get-go, for this section only.

## Walkthrough

What are we doing here? We're doing a walkthrough? Or what module? Can you make sure that I'm properly oriented, and that I didn't end up here by mistake?

Is there any preliminary information I should know? Do I need anything else installed from elsewhere?

#### Step One

Tell me about step one. What [method](https://mylittlepony.hasbro.com/en-us) do I need? 

Tell me about any arguments I'm going to use. If there's something special about one of them:

* `Argument`: tell me `here` about what I need to know
* `Another_argument`: and `here` too

Command:

```bash
here's the command. Make sure to put the full terminal input, so that I know what I should be looking at.
```

Response:

```json
And place the full terminal output here
```

If there is any information that would be considered private in the input, like a private key, maybe you should blank it out so that no one starts accidentally using it in their life. That could be disastrous:

```bash
.komodo-cli importkey DO_NOT_USE_zxcfa8r91q234msdjkf3455
```

And if there is any output that is extremely, extremely long (like a `hex` value, carefully abbreviate it. Don't delete all the surrounding content. Rather, keep the outer content markers, and delete around them until you keep the good stuff, like so:

```json
[
    ... (omitted for brevity) ...

        {
        
            ... (omitted for brevity) ..

                "the": "good"
                "stuff": "goes"
                "here": "Make Whales Great Again"

            ... (omitted for brevity) ..

        },

    ... (omitted for brevity) ..

]
```

Is there anything about the response that I need to watch for?

Is it necessary to tell me what I should look for to know that I did it right? It may not be, but sometimes, it's helpful.

#### Next Step

Keep it up

#### Final Step

Tell me the final thing I should do:

```bash
final terminal input
```

Response:

```json
{
    "final": "full terminal output"
}
```

And now we're done.

If you're going to congratulate me, please don't use an exclamation mark. It's corny. Just let me know that I went through everything I need to, and I'm ready now to continue on with other things.

If you want to mention Discord again, now is a good time.

## methodname

**sterlized method instructions [array, items, go, like, this] ( optional_parameters_go_in_parens )**

The `insert_method_name` method ... does what?

Note the format for everything above. I try to keep it the same every single time. Why? Because that way a customer never feels lost, no matter where they are.

Note that I try to avoid the word "rpc". Instead, I defer to the word, "method". Why? Because the word "rpc" is very unfriendly to a newcomer. 

I don't know who is reading each paragraph. Any user can show up on any page of the documentation, and on any paragraph, at any point in time.

Trying to reexplain the word, "rpc", each time would be annoying and cumbersome. The word "method" just gets the job done, and no one complains, so stick with that.

See how I try to keep each paragraph limited to one to three sentences? Internet readers have low attention spans. Give them a breath of air frequently by not making any paragraph too long. Exceptions (such as this one) are okay, but keep them limited.

Also, note that I rarely skip articles, like "a" and "the". Why? Because if they are not used in a homogenous format, anyone can become confused. Since we have people writing on the team who come from all over the world, everyone approaches these articles differently. For the foreseeable future, we should just use them everywhere they would normally belong, and skip them only if it is truly, truly awkard.

#### Another Section

Note also that I avoid capitalizing acronyms whenever possible. So, UTXO is utxo, and JSON is json. Why? Because the capitalized acronyms are even more unfriendly than a regular acronym. We want people to feel like they can read through the docs with AS LITTLE YELLING AT THEM IN CAPITALIZED LETTERS as possible.

::: tip
Again, try to avoid adding tips. But if you have to, see if you can add them at the end of the method, rather than at the beginning. 
:::

#### Arguments:

| Name | Type | Description |
| ---- | ---- | ----------- |
| argument | (string) | it is the developer's responsibility to make sure that each argument has an explanation, not the writer's |
| argument | (boolean) | the writer cannot assume that they know what any argument is, unless confirmed by a developer |
| argument | (number, optional) | because sometimes there are arguments and properties that appear to be the same as something the writer has seen before |
| argument | (string) | but in fact, the argument name only looks the same |

#### Response:

| Name | Type | Description |
| ---- | ---- | ----------- |
| response | (array of json objects) | start each description with a lower case letter; if you need to use two sentences, see if you can do it with that semi-colon (`;`) instead |
| response | (string) | if you have to use more than two sentences. Go ahead and use a period. It's okay, although I do try to avoid this. However, never end a description with a period |
| response | (number) | when referring to a key, such as `response` to the left, I will often use the word property, just because that's how I started the docs and I never fixed it |
| response | (number) | also, I use the word "value" to describe... the value |
| response | (number) | i try to keep things as consistent as possible; again, consistency helps a customer move quickly through the docs without having to relearn the format |
| response | (string) | it's okay to use [links](https://en.wikipedia.org/wiki/Nobody_for_President) and `highlights` in the description, but again, don't combine them together |

::: tip
Do you really need to put a tip here? Really? Make sure you do. Most likely, you don't, but there have been maybe one or two exceptions. I suggest putting any content up above, in the description section. Maybe make it a ### triple section heading.
:::

#### :pushpin: Examples:

Command: 

```bash
notice that I didn't talk a lot about the examples
```

Response:

```json
{
    "because": "the examples should speak for themselves",
    "we": "put these here as a last resort, in case absolutely nothing else makes sense in anything we said"
}
```

## methodname

**sterlized method parameters**

Same as above.

Do note that in the method name above, `## methodname`, we didn't capitalize it, nor did we include any parameters in it. 

Also, note below that if you don't have any arguments or responses, you need to say so. Otherwise, the reader will think that you forgot to add them and they'll get confused.

When you get to the last method (rpc), just end the docs. No need for any final conclusion. The user is going to be hopping back and forth throughout the docs, so there's no need to say goodbye.

#### Arguments:

| Name | Type | Description |
| ---- | ---- | ----------- |
| (none) | | | 

#### Response:

| Name | Type | Description |
| ---- | ---- | ----------- |

| (none) | | | 

#### :pushpin: Examples:

Command:

```bash
You can skip the Response aspect of the examples if there is truly nothing to show, but try to avoid skipping the Command aspect
```
