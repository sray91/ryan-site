import styles from './page.module.css';

export const metadata = {
  title: "Before It Breaks — The Everyman's Playbook",
  description: "A field guide for the people who see problems coming.",
};

export default function EverymanPlaybook() {
  return (
    <div className={styles.root}>

      {/* COVER */}
      <div className={styles.cover}>
        <div className={styles.coverLabel}>LNS Research</div>
        <h1>Before It<br /><span>Breaks</span></h1>
        <div className={styles.coverRule}></div>
        <p className={styles.coverSubtitle}>A field guide for the people who see problems coming.</p>
        <div className={styles.coverAuthors}>Mike Carroll &amp; Ryan Cahalane</div>
        <div className={styles.coverByline}>For the people who actually do the work</div>
      </div>

      {/* TABLE OF CONTENTS */}
      <div className={styles.toc}>
        <h2>Contents</h2>

        <a href="#ch1" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Chapter 1</div>
            <div className={styles.tocTitle}>The Tuesday Problem</div>
          </div>
        </a>

        <a href="#ch2" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Chapter 2</div>
            <div className={styles.tocTitle}>The Extra Job Nobody Hired You For</div>
          </div>
        </a>

        <a href="#ch3" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Chapter 3</div>
            <div className={styles.tocTitle}>Who&apos;s Actually Allowed to Decide</div>
          </div>
        </a>

        <a href="#ch4" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Chapter 4</div>
            <div className={styles.tocTitle}>When the Place Starts Running Thin</div>
          </div>
        </a>

        <a href="#ch5" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Chapter 5</div>
            <div className={styles.tocTitle}>Why Good Ideas Die Quietly</div>
          </div>
        </a>

        <a href="#ch6" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Chapter 6</div>
            <div className={styles.tocTitle}>Getting Out of Your Own Way</div>
          </div>
        </a>

        <a href="#ch7" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Chapter 7</div>
            <div className={styles.tocTitle}>The Money Trap</div>
          </div>
        </a>

        <a href="#conclusion" className={styles.tocItem}>
          <div>
            <div className={styles.tocChapter}>Conclusion</div>
            <div className={styles.tocTitle}>Building the Bridge</div>
          </div>
        </a>
      </div>


      {/* CHAPTER 1 */}
      <div className={styles.chapter} id="ch1">
        <div className={styles.chapterNumber}>Chapter 1</div>
        <h2>The Tuesday Problem</h2>

        <div className={styles.chapterPlay}>
          <strong>What you&apos;ll do with this chapter</strong>
          Think back to a problem that cost more than it needed to. Find the moment someone first noticed it. Count how many steps it took before anyone was allowed to fix it.
        </div>

        <h3>Something Feels Off</h3>

        <p>Most big problems don&apos;t show up as emergencies.</p>

        <p>They show up on a Tuesday. Middle of a normal shift. Nothing&apos;s broken. The line&apos;s running. Numbers look fine. But something&apos;s a little off. A motor sounds different — not wrong, just different. A gauge is reading where it always does, but it drifted a bit getting there. A conveyor&apos;s doing its job, but it&apos;s working just slightly harder than it was last week.</p>

        <p>You notice. You&apos;ve been standing next to this stuff long enough to know what it sounds like when it&apos;s happy. You know its moods.</p>

        <p>You don&apos;t hit the alarm. You&apos;re not a guy who cries wolf. You mention it to the next shift. You write a note. You make a mental note to check back on it.</p>

        <p>In your gut, you know this is the cheapest moment to deal with it.</p>

        <p>And then nothing happens.</p>

        <p>Not because anyone ignored you. Not because the lead is a bad person. Just because the system isn&apos;t built to act on &ldquo;something feels off.&rdquo; It&apos;s built to act on &ldquo;it&apos;s definitely broken.&rdquo;</p>

        <p>So it waits. And while it waits, the problem gets worse.</p>

        <h3>Why It Has to Climb the Staircase</h3>

        <p>Here&apos;s what happens to that note you wrote.</p>

        <p>It goes into a log somewhere. Maybe someone reviews the log at the end of the week. Maybe it gets added to a list of things to discuss at the next safety meeting. Maybe a supervisor sends it up to maintenance. Maybe maintenance is backed up and schedules it for next week.</p>

        <p>Lot of maybes. Not a lot of fixes.</p>

        <p>Each one of those steps makes sense on its own. Nobody&apos;s being lazy or careless. But every step takes time. And by the time your little Tuesday feeling has climbed all the way to someone who can actually authorize a fix — it&apos;s not a feeling anymore. It&apos;s a noise you can hear across the floor. Or a bearing that&apos;s about to give out. Or a $40,000 repair instead of a $400 one.</p>

        <p>Think of it like a <span className={styles.keyTerm}>permission staircase</span>. Your signal has to climb every step before anybody&apos;s allowed to do anything about it. Every step is someone reviewing, confirming, approving. All reasonable. All necessary. All slow.</p>

        <div className={styles.pullQuote}>&ldquo;The trouble is, you can&apos;t prove a problem early — you can only feel it. And the staircase doesn&apos;t move on feelings.&rdquo;</div>

        <p>The guys who&apos;ve been around for twenty years understood this without ever putting words to it. They knew which issues to push hard on, and which ones to bring up quietly but often — until something finally stuck.</p>

        <p>They weren&apos;t impatient. They were strategic. They knew that the longer something sat, the more expensive it got.</p>

        <h3>The Gap Between Noticing and Doing</h3>

        <p>There&apos;s a name for this problem. We&apos;ll call it <span className={styles.keyTerm}>decision latency</span> — the time between when someone spots a problem and when the system lets anyone do something about it.</p>

        <p>You&apos;ve felt it. Everybody on the floor has felt it. It&apos;s that stretch where you know something&apos;s drifting, but it hasn&apos;t become undeniable yet — so you can&apos;t get it fixed.</p>

        <p>Here&apos;s the thing about that gap: it isn&apos;t neutral. Time doesn&apos;t just pass. The problem quietly gets more expensive the whole time it&apos;s sitting there.</p>

        <p>A $50 fix becomes a $500 fix. A $500 fix becomes a $5,000 emergency shutdown. A conversation before the shift becomes a post-incident report and a shutdown audit.</p>

        <p>The experienced guys never argued with management about this stuff in meeting rooms. They just quietly calculated the cost of waiting. And they were usually right.</p>

        <h3>Why Tuesday Matters Most</h3>

        <p>Tuesday is when it&apos;s still cheap.</p>

        <p>Tuesday is when you&apos;ve got time to look at something properly. When the fix is still simple. When you don&apos;t need to pull a crew off another job to deal with it. When it&apos;s a 10-minute adjustment, not a six-hour scramble.</p>

        <p>The goal of this book isn&apos;t to turn you into a complainer. It&apos;s to help you say the right thing at the right time, in the right way — so that your Tuesday feeling has a better shot at turning into a Tuesday fix, instead of a Friday nightmare.</p>

        <div className={styles.chapterDivider}>· · ·</div>

        <div className={styles.exercise}>
          <div className={styles.exerciseLabel}>End of Chapter Exercise</div>
          <h4>Find Your Tuesday</h4>

          <div className={styles.exerciseStep}>
            <strong>Step 1 — Find a problem that cost more than it needed to</strong>
            Not the worst thing that ever happened. The one that somebody — maybe you — saw coming. Pick one.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 2 — Find when it was first noticed</strong>
            Who noticed it? What exactly did they notice? What did they do with that information?
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 3 — Count the steps</strong>
            How many people touched that information before anyone was allowed to act? Not how many people knew — how many handoffs happened before someone said &ldquo;go fix it&rdquo;?
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 4 — Ask the quiet question</strong>
            What would it have cost to fix it the day someone first noticed? Compare that to what it actually cost. That difference — that&apos;s the price of the ladder.
          </div>

          <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>You&apos;re not looking for someone to blame. You&apos;re mapping the distance between someone noticing and someone being allowed to act. That distance has a dollar amount attached to it.</p>
        </div>
      </div>


      {/* CHAPTER 2 */}
      <div className={styles.chapter} id="ch2">
        <div className={styles.chapterNumber}>Chapter 2</div>
        <h2>The Extra Job Nobody Hired You For</h2>

        <div className={styles.chapterPlay}>
          <strong>What you&apos;ll do with this chapter</strong>
          Find one workaround your team uses every week. Calculate what it actually costs. Then make the case to either fix the real problem or officially acknowledge the workaround — so it stops living only in your head.
        </div>

        <h3>The Real Way the Work Gets Done</h3>

        <p>If you&apos;ve worked in a plant for more than a few years, you know the difference between the official process and the actual process.</p>

        <p>The official process is in the binder. It&apos;s what you show auditors. It&apos;s what the new hire gets trained on.</p>

        <p>The actual process is what you do at 6 AM on a Thursday when the system is two updates behind and the supervisor hasn&apos;t come in yet. You check the thing that the system doesn&apos;t check. You use the spreadsheet that lives on your phone because the one on the shared drive is always wrong. You know which sequence actually works this week even though nothing in the procedure reflects it.</p>

        <p>None of this feels special. It&apos;s just doing the job right.</p>

        <p>You never called it a workaround. You called it knowing your stuff.</p>

        <h3>The Hidden Cost of Being the Reliable Guy</h3>

        <p>Here&apos;s what nobody talks about. Every workaround you carry has a cost. It just doesn&apos;t show up on a budget sheet.</p>

        <p>It shows up as the part of your brain that&apos;s always running in the background. Checking. Remembering. Catching things before they fall through the cracks. The mental bookkeeping that never really turns off.</p>

        <p>You know which guy on second shift skips the torque check when he&apos;s rushing. So you double-check it yourself when you come in, even though that&apos;s not your job. You don&apos;t make a big deal about it. You just do it.</p>

        <p>You know the inventory system is always a day behind, so you keep your own count on a piece of tape stuck to the shelf. Faster than waiting for the system to update. The tape has been more reliable than the software for three years running.</p>

        <p>You know the ERP takes 15 clicks to enter a simple part swap, so you batch them up and enter them at the end of the week. Less painful that way.</p>

        <p>None of this is dramatic. It&apos;s just what you do to keep things from going sideways.</p>

        <div className={styles.pullQuote}>&ldquo;The cost isn&apos;t in your paycheck. It&apos;s in your attention. And attention is the one thing you can&apos;t get more of.&rdquo;</div>

        <h3>When the Workaround Becomes the Foundation</h3>

        <p>Here&apos;s when it gets dangerous.</p>

        <p>A workaround starts as something optional — something you do because it helps. Then people start depending on it. Then the system quietly assumes someone will always catch that gap. It stops being extra effort and becomes load-bearing.</p>

        <p>You notice it when you can&apos;t take a sick day without something going wrong. When a task only works smoothly if you&apos;re the one doing it. When your lead says &ldquo;just check with Mike on that&rdquo; — and Mike&apos;s name is now part of the process, even though it&apos;s not written anywhere.</p>

        <p>At that point, it&apos;s not a workaround anymore. It&apos;s infrastructure. It&apos;s holding something up. And it&apos;s infrastructure that nobody&apos;s maintaining, nobody&apos;s documenting, and nobody&apos;s planning to replace.</p>

        <p>That&apos;s how you end up carrying more weight than your title suggests. Not because you were assigned it. Because the system needed someone to carry it, and you were there. Call it <span className={styles.keyTerm}>system burden</span> — the invisible load a few people quietly hold up so the rest of the place can look like it&apos;s working.</p>

        <h3>Why Nobody Fixes It</h3>

        <p>This is the frustrating part.</p>

        <p>From the outside, everything looks fine. Output&apos;s steady. Targets are hit. No incidents. No red flags on the dashboard.</p>

        <p>That&apos;s because the workarounds are doing their job too well. They&apos;re hiding the actual cost.</p>

        <p>There&apos;s no outage to investigate. No report gets filed that says &ldquo;Dave spent three hours this week manually reconciling inventory because the system doesn&apos;t do it right.&rdquo; Nobody sees that. It just looks like Dave is good at his job.</p>

        <p>Which he is. But he&apos;s also doing part of the software&apos;s job, and the software&apos;s job, and the part of the process that broke six years ago and never got fixed properly. Dave has a title somewhere. Whatever it is, it doesn&apos;t cover half of what Dave actually does.</p>

        <p>Veterans on the floor see the pattern clearly. Same workarounds get invented over and over. Different crew, same side spreadsheet. Different tool, same manual override. It&apos;s not about individual cleverness. It&apos;s about the same holes in the system getting plugged by whoever&apos;s standing next to them.</p>

        <div className={styles.chapterDivider}>· · ·</div>

        <div className={styles.exercise}>
          <div className={styles.exerciseLabel}>End of Chapter Exercise</div>
          <h4>Make the Cost Visible</h4>

          <div className={styles.exerciseStep}>
            <strong>Step 1 — One week, write it down</strong>
            For one week, every time you use an unofficial shortcut — your own notebook, a skip, a manual fix, a double-check nobody asked for — write it down. Don&apos;t judge it. Just count it.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 2 — Calculate what it costs</strong>
            Estimate how many hours per week that workaround takes. Multiply by how many people do it. Even a rough number is useful. &ldquo;We spend about 10 hours a week on this&rdquo; is more powerful than &ldquo;it takes a while.&rdquo;
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 3 — Bring it to your lead</strong>
            Don&apos;t say &ldquo;the system is bad.&rdquo; Say: &ldquo;We&apos;re spending 10 hours a week maintaining a side spreadsheet because the ERP takes 15 steps to enter a simple part. That&apos;s time we&apos;re not spending on actual work.&rdquo; Give it a number.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 4 — Force a choice</strong>
            Ask for one of two things. Either fix the official process, or make the workaround official — so everyone can use it safely and it stops depending on one person knowing it exists.
          </div>

          <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>The goal isn&apos;t to complain. It&apos;s to make the invisible visible — so someone with the authority to fix it finally has a reason to.</p>
        </div>
      </div>


      {/* CHAPTER 3 */}
      <div className={styles.chapter} id="ch3">
        <div className={styles.chapterNumber}>Chapter 3</div>
        <h2>Who&apos;s Actually Allowed to Decide</h2>

        <div className={styles.chapterPlay}>
          <strong>What you&apos;ll do with this chapter</strong>
          Find one decision that has to travel too far before it&apos;s allowed to happen. Make the case for moving that decision one step closer to the floor.
        </div>

        <h3>The Org Chart Isn&apos;t the Whole Story</h3>

        <p>Every company has an org chart. Boxes. Lines. Titles. It shows who reports to who and who&apos;s supposed to approve what.</p>

        <p>And then there&apos;s how it actually works.</p>

        <p>If you&apos;ve been on the floor for any length of time, you already know the difference. You know which supervisor actually makes calls and which one just forwards emails. You know which tech can shut something down on his own judgment and which one has to get three people on the phone first. You know which decisions move fast and which ones get stuck.</p>

        <p>That&apos;s not about people being difficult. That&apos;s about where permission actually lives — and how far it has to travel before it can turn into action.</p>

        <h3>Permission Is a Distance Problem</h3>

        <p>Think about the last time something was off on the line.</p>

        <p>Small thing. Not an emergency. Just something drifting. You noticed it. Did you act? Did you wait? Did you feel like you were allowed to handle it — or did you feel like it needed to go somewhere else first?</p>

        <p>That feeling is more important than most people realize.</p>

        <p>Permission isn&apos;t just written down in a procedure. It lives in what people feel safe doing without being asked. Some things you just handle. Others, you&apos;ve learned to send up the chain even when you know the answer. Not because you need help — but because touching it without approval feels risky.</p>

        <p>Permission is a distance — the same <span className={styles.keyTerm}>permission staircase</span> from Chapter 1, seen from the other side. How far does something have to travel before someone&apos;s allowed to fix it?</p>

        <p>The shorter that distance, the faster problems get handled. The longer it is, the more time it takes — and the more expensive the delay gets.</p>

        <h3>Why the Ladder Got Taller</h3>

        <p>The approval process didn&apos;t get built to slow things down. It got built to protect things. Keep costs under control. Make sure nobody makes a $50,000 mistake because they were in a hurry.</p>

        <p>That made sense for big decisions. It still does.</p>

        <p>The problem is, it got applied to small decisions too. Now a $200 fix that any experienced tech could handle on his own has to go through the same approval path as a capital equipment decision. Not because anyone made a policy that said that — it just happened over time. The way weeds grow in a parking lot.</p>

        <p>And the guys who used to be able to catch things early and just fix them? Either they retired, or they got burned for acting without approval. So now they wait.</p>

        <div className={styles.pullQuote}>&ldquo;You can&apos;t build a system that asks for early action and then makes early action expensive. Something&apos;s going to give.&rdquo;</div>

        <h3>When the Gate Is Financial</h3>

        <p>Sometimes permission isn&apos;t about authority — it&apos;s about money.</p>

        <p>Not because the plant can&apos;t afford it. But because even a small fix gets routed into a budget review process built for big decisions. The paperwork required to spend $300 takes longer to complete than the fix itself.</p>

        <p>So nothing happens. The fix doesn&apos;t get denied. It just sits in a queue waiting for the right meeting.</p>

        <p>That&apos;s a gate. And it&apos;s a gate that often costs more — in delays and eventually in damage — than whatever it was trying to protect.</p>

        <div className={styles.chapterDivider}>· · ·</div>

        <div className={styles.exercise}>
          <div className={styles.exerciseLabel}>End of Chapter Exercise</div>
          <h4>Map Where Decisions Actually Live</h4>

          <div className={styles.exerciseStep}>
            <strong>Step 1 — List every approval you need for a routine decision</strong>
            For each one, ask honestly: does the person signing off actually understand what they&apos;re approving? If the answer is &ldquo;not really&rdquo; — that&apos;s a rubber stamp, not a real safeguard.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 2 — Find the safe-to-fix zone</strong>
            What decisions in your area can be undone in under 30 minutes if you get it wrong? Those are your candidates for &ldquo;the person closest to it should just handle this.&rdquo; List them.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 3 — Make a specific proposal</strong>
            Vague requests like &ldquo;give us more autonomy&rdquo; go nowhere. Specific ones get considered. Try: &ldquo;For any adjustment that&apos;s reversible in under 30 minutes and under $500, the lead tech should have final call — no approval needed.&rdquo; That&apos;s a proposal someone can say yes or no to.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 4 — Track how long approvals actually take</strong>
            Pick one routine request. Time how long it takes from &ldquo;we noticed this&rdquo; to &ldquo;approved to fix it.&rdquo; If the approval process takes longer than the repair, the approval process is the bottleneck — not the equipment.
          </div>

          <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>This isn&apos;t about cutting corners. It&apos;s about making sure the safeguards are protecting the right things — not slowing down the things that should be simple.</p>
        </div>
      </div>


      {/* CHAPTER 4 */}
      <div className={styles.chapter} id="ch4">
        <div className={styles.chapterNumber}>Chapter 4</div>
        <h2>When the Place Starts Running Thin</h2>

        <div className={styles.chapterPlay}>
          <strong>What you&apos;ll do with this chapter</strong>
          Start tracking what your team prevents — not just what breaks. Build the case that prevention has real dollar value, before you&apos;re forced to prove it by watching something fail.
        </div>

        <h3>You Can Feel It Before It Shows Up on Paper</h3>

        <p>There&apos;s a feeling you get when a place is starting to run thin.</p>

        <p>It&apos;s not a crisis. Nothing&apos;s broken. The numbers look okay. But the day feels heavier. Small stuff needs more babysitting than it used to. You can&apos;t leave a machine alone for a couple hours without checking on it. You&apos;re fixing the same thing for the third time this month and you know it&apos;s going to be a fourth.</p>

        <p>Everything still works. It&apos;s just working harder.</p>

        <p>Guys who&apos;ve been on the floor long enough recognize that feeling right away. Not as an emergency — as a warning. The place is getting <span className={styles.keyTerm}>fragile</span>. Not broken. Fragile.</p>

        <p>That&apos;s a real condition. It has a real cost. And the tricky thing is, it almost never shows up on any dashboard until it&apos;s too late.</p>

        <h3>What Actually Makes a Floor Resilient</h3>

        <p>A resilient floor isn&apos;t one where nothing goes wrong.</p>

        <p>It&apos;s one where things go wrong and the day doesn&apos;t blow up.</p>

        <p>A supplier delivers the wrong material. Someone calls in sick. A machine throws a code that doesn&apos;t match anything in the manual. In a resilient place, people absorb that. They adjust. Work keeps moving. The surprise doesn&apos;t become a crisis.</p>

        <p>That doesn&apos;t happen because the process is perfect. It happens because there&apos;s slack — room to move, experienced people who can read the situation, and trust that someone close to the problem can handle it without asking permission first.</p>

        <p>Experienced hands know exactly what provides that slack. And they know when it&apos;s running low.</p>

        <h3>Experience That Takes Years to Build — And Seconds to Lose</h3>

        <p>There&apos;s a difference between someone who can follow a procedure and someone who knows when the procedure isn&apos;t enough.</p>

        <p>Anybody can be trained to respond to an alarm. That&apos;s compliance. Hit this button when this light comes on.</p>

        <p>Actual competence is different. It&apos;s hearing something before the alarm goes off. Noticing a pattern that doesn&apos;t quite repeat the way it used to. Having the instinct to slow things down even when everything &ldquo;looks fine.&rdquo;</p>

        <p>That kind of judgment takes years to develop. You build it by being wrong a few times and learning from it. By watching how the guy next to you handles something and asking him why. By paying attention to what happens right before things go bad, not just after.</p>

        <div className={styles.pullQuote}>&ldquo;Experience is expensive only after you no longer have it.&rdquo;</div>

        <p>The problem is that this kind of competence is really hard to put in a business case. Its value shows up as things that <em>didn&apos;t</em> happen. No breakdown. No close call. No &ldquo;we got lucky today.&rdquo;</p>

        <p>That&apos;s easy for management to overlook. Nothing happened, right? Everything&apos;s fine.</p>

        <p>Until the person who was catching all those small things quietly leaves. And suddenly the floor is running much closer to the edge than anyone realized.</p>

        <h3>When You Rely on One Person Too Long</h3>

        <p>Here&apos;s a pattern that plays out in every plant at some point.</p>

        <p>One guy — sometimes a few — just knows stuff. Where the bodies are buried. Which machine throws that particular code when the humidity is high. Which line has a drift that only shows up on the second shift. They catch things, quietly, before they become anyone else&apos;s problem.</p>

        <p>They go on vacation. Or get pulled to another project. Or retire. And suddenly things start going wrong in ways nobody can explain.</p>

        <p>Funny how the place that didn&apos;t need Mike for anything official can&apos;t figure out why line 3 is running weird the week Mike is in Florida.</p>

        <p>Nobody violated procedure. Nobody skipped training. The system just asked more of certain individuals than it ever acknowledged — and built a quiet dependency on them without ever admitting it.</p>

        <p>That&apos;s not a people problem. That&apos;s a design problem.</p>

        <div className={styles.chapterDivider}>· · ·</div>

        <div className={styles.exercise}>
          <div className={styles.exerciseLabel}>End of Chapter Exercise</div>
          <h4>Start Tracking What You Prevent</h4>

          <div className={styles.exerciseStep}>
            <strong>Step 1 — Name what you catch</strong>
            Pick one thing your team catches regularly before it blows up. A bearing you spot early. A batch that gets caught before it ships. A code you recognize before it shuts the line down. Put a dollar number on what it would cost if you missed it once.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 2 — Start a &ldquo;Quiet Wins&rdquo; log</strong>
            Once a month, write down what got caught early. Keep it simple: &ldquo;Caught 3 issues this month. If we&apos;d missed them, we&apos;re looking at roughly 12 hours of downtime and $8,000 in parts.&rdquo; That&apos;s the real value being generated — it just isn&apos;t showing up anywhere official.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 3 — Change what you call it</strong>
            Stop calling it maintenance. Try &ldquo;capacity protection.&rdquo; It sounds different because it <em>is</em> different. Maintenance fixes things. Capacity protection keeps the floor from getting fragile in the first place. That reframe matters when you&apos;re trying to make a case for resources.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 4 — Build the running total</strong>
            Track these numbers over a quarter. One month&apos;s number is easy to dismiss. Three months of consistent numbers starts to look like evidence. That&apos;s your business case — built from what actually happens on the floor.
          </div>
        </div>
      </div>


      {/* CHAPTER 5 */}
      <div className={styles.chapter} id="ch5">
        <div className={styles.chapterNumber}>Chapter 5</div>
        <h2>Why Good Ideas Die Quietly</h2>

        <div className={styles.chapterPlay}>
          <strong>What you&apos;ll do with this chapter</strong>
          Learn how to keep a useful observation alive when the organization keeps asking for one more confirmation before it&apos;s allowed to matter.
        </div>

        <h3>It Doesn&apos;t Get Rejected — It Just Cools Off</h3>

        <p>Most good ideas from the floor don&apos;t get shot down in a meeting.</p>

        <p>They don&apos;t get argued with. They don&apos;t get disproven. They just lose momentum.</p>

        <p>You notice something. Not a big discovery. Just a pattern that keeps showing up. A machine that always throws that code right before a bigger problem. A handoff that goes wrong in the same spot every time. A step in the process that everyone skips because it doesn&apos;t actually match what the work requires.</p>

        <p>You bring it up. Carefully. No drama. &ldquo;Hey, I&apos;ve noticed this a few times — might be worth looking at.&rdquo;</p>

        <p>And then you hear the responses:</p>

        <ul>
          <li>&ldquo;We should get more data on that before we do anything.&rdquo;</li>
          <li>&ldquo;We looked at something similar a while back — didn&apos;t pan out.&rdquo;</li>
          <li>&ldquo;Good catch. Let&apos;s revisit this once things slow down.&rdquo;</li>
        </ul>

        <p>Things have never, in the history of manufacturing, slowed down.</p>

        <p>Every one of those responses is reasonable. None of them is a no. But combined, over time, they add up to: nothing happens.</p>

        <p>The idea doesn&apos;t die. It just cools off. And by the time anyone circles back, you&apos;ve stopped bringing it up.</p>

        <h3>Why the System Isn&apos;t Ready</h3>

        <p>Here&apos;s the frustrating truth about early observations: they almost always arrive before the organization is ready to act on them.</p>

        <p>The signal shows up in week one. The organization becomes comfortable doing something about it in week twelve. In between, the signal has to survive — kept alive by whoever noticed it, against a steady stream of polite deferrals.</p>

        <p>Most signals don&apos;t make it.</p>

        <p>Not because they were wrong. Because nobody owned keeping them warm.</p>

        <div className={styles.pullQuote}>&ldquo;The most expensive thing about a good idea isn&apos;t acting on it. It&apos;s watching it die and reinventing it six months later, after the damage is done.&rdquo;</div>

        <h3>Four Things You Can Actually Do</h3>

        <p>You can&apos;t change the whole organization overnight. But there are things you can do right now to give a good observation a better chance of surviving.</p>

        <p><strong>Make it small enough to test this week.</strong> Broad observations die in meetings. Small, specific ones can be tested immediately. If you&apos;ve noticed a pump bearing tends to go bad about six weeks after you hear a certain vibration change, you don&apos;t need a committee. You need to tag two pumps and watch them for six weeks. The smaller and more testable you make it, the harder it is to defer.</p>

        <p><strong>Write it down with a date and a prediction.</strong> &ldquo;I noticed X on [date]. I expect Y to happen within Z weeks.&rdquo; Now you have something that can be checked. Either you&apos;re right — and the observation earns credibility — or you&apos;re wrong, and you learn something. Either way, it moves forward instead of just sitting in your head.</p>

        <p><strong>Get a second person to verify it.</strong> One person saying &ldquo;I think there&apos;s something here&rdquo; is easy to defer. Two people saying the same thing is harder. You&apos;re not looking for permission — you&apos;re looking for someone else who can see what you&apos;re seeing.</p>

        <p><strong>Put a price on the delay.</strong> When someone says &ldquo;let&apos;s get more data,&rdquo; ask quietly: &ldquo;What would we expect to see if we waited another month?&rdquo; Then come back in a month. Not to say you were right — just to make the cost of the delay visible. That shifts the conversation from &ldquo;we don&apos;t have enough evidence&rdquo; to &ldquo;how much are we willing to pay for more certainty?&rdquo;</p>

        <div className={styles.chapterDivider}>· · ·</div>

        <div className={styles.exercise}>
          <div className={styles.exerciseLabel}>End of Chapter Exercise</div>
          <h4>Get the Gut Feeling Out of Your Head</h4>

          <div className={styles.exerciseStep}>
            <strong>Step 1 — Ask &ldquo;How did you know?&rdquo;</strong>
            The next time you or a coworker catches something early, stop and ask: what tipped you off? What did you see or hear? What felt different? Write it down specifically — not &ldquo;it sounded wrong&rdquo; but &ldquo;the pitch on the motor changed and it was running 8 degrees warmer than usual.&rdquo;
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 2 — Find the simple indicator</strong>
            Can you replicate that early warning with something physical? A $30 vibration sticker. A temperature dot. A laminated checklist taped to the machine. The goal: get the early warning out of one person&apos;s head and into the environment where anyone can see it.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 3 — Build your pre-alarm list</strong>
            Write down 5–10 things that &ldquo;usually mean something&apos;s coming&rdquo; — not the alarms themselves, but the things that show up right before. Format: &ldquo;If X, expect Y within Z days.&rdquo; Tape it somewhere useful.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 4 — Make one public prediction</strong>
            Pick the most testable item. Tell your lead: &ldquo;Based on what I&apos;m seeing, I expect [specific thing] within [specific timeframe].&rdquo; Track it. If you&apos;re right, the observation earned credibility. If you&apos;re wrong, you learned something. Either way, you moved it forward.
          </div>
        </div>
      </div>


      {/* CHAPTER 6 */}
      <div className={styles.chapter} id="ch6">
        <div className={styles.chapterNumber}>Chapter 6</div>
        <h2>Getting Out of Your Own Way</h2>

        <div className={styles.chapterPlay}>
          <strong>What you&apos;ll do with this chapter</strong>
          Find one routine decision that still requires unnecessary approval — and make the case for removing that step.
        </div>

        <h3>The Best Improvements Subtract</h3>

        <p>For the last 20 years, the answer to every operations problem was more visibility. More dashboards. More sensors. More alerts. More screens on the wall showing you things that are already happening. Some places have so many dashboards the dashboards need a dashboard.</p>

        <p>Nobody argued with it. You can&apos;t fix what you can&apos;t see.</p>

        <p>But here&apos;s what the experienced guys noticed: more visibility didn&apos;t make the work lighter. It just added more things to watch. The floor already <em>knew</em> plenty. What it needed was fewer things in the way of acting on what it knew.</p>

        <p>There&apos;s a difference between a tool that makes your job lighter and a tool that just makes your job more visible.</p>

        <p>Lighter means: something you used to carry is gone. A step that took judgment now happens automatically. A decision that required a phone call is pre-approved. You show up in the morning with fewer things to worry about, not more.</p>

        <p>More visible means: you can see everything — including all the problems you were already aware of, now rendered in a different color on a different screen.</p>

        <p>The best improvements aren&apos;t about adding. They&apos;re about subtracting. Taking something off the pile. Removing a step that doesn&apos;t need to be there. Pre-approving a decision that doesn&apos;t need a meeting every time.</p>

        <p>That&apos;s not automation for its own sake. That&apos;s respect for the attention of the people doing the work.</p>

        <h3>Fast Doesn&apos;t Mean Frantic</h3>

        <p>When people hear &ldquo;move faster,&rdquo; they think: rush. The guys who&apos;ve been doing this for decades never confused speed with hurry.</p>

        <p>What they were after was something different: how long does it take to go from &ldquo;we noticed this&rdquo; to &ldquo;it&apos;s handled&rdquo; — without a meeting, without six people in a room deciding on a $200 fix?</p>

        <p>Fast places don&apos;t feel busy. They feel smooth. <em>Calm.</em> Work flows. Issues get absorbed. People spend their time on things that deserve their attention — not on clearing bottlenecks the approval process created.</p>

        <div className={styles.pullQuote}>&ldquo;When a floor is working right, you barely notice it. When it isn&apos;t, you notice everything.&rdquo;</div>

        <p>Some decisions <em>should</em> be slow. Real risk, real cost, real uncertainty — slowing those down buys you something. But most decisions are just slow because nobody ever sat down and asked: &ldquo;Does this actually need an approval every single time?&rdquo;</p>

        <p>Those are the ones worth removing. Not the safeguards. The reflexes.</p>

        <div className={styles.chapterDivider}>· · ·</div>

        <div className={styles.exercise}>
          <div className={styles.exerciseLabel}>End of Chapter Exercise</div>
          <h4>Find One Thing to Remove</h4>

          <p>This exercise isn&apos;t about transformation. It&apos;s about relief.</p>

          <div className={styles.exerciseStep}>
            <strong>Step 1 — Name the heavy part</strong>
            What&apos;s one part of the regular work that feels heavier than it should? Not the biggest problem — the one that keeps coming back and draining time. Something routine. Something predictable. Something everyone already knows how to handle.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 2 — Map the path</strong>
            Where does it first show up? Who notices it? What happens next — a report, an alert, a meeting, an approval? How many steps before anything actually changes?
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 3 — Find the step that could disappear</strong>
            Which part of that path could be handled without asking someone to carry it? Not with more visibility — with removal. A step that could just go away. A decision that could be pre-approved. A known adjustment that could be made automatically.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 4 — Make it specific and propose it</strong>
            &ldquo;I&apos;d like to remove the approval step for [specific routine task] because it takes 2 days to approve something that takes 20 minutes to fix. Here&apos;s what it would take to do that safely.&rdquo; That&apos;s a proposal. That&apos;s something that can be evaluated.
          </div>

          <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>When you remove friction from the right place, the floor doesn&apos;t get faster. It gets calmer. And calm is what lets good judgment show up when it actually matters.</p>
        </div>
      </div>


      {/* CHAPTER 7 */}
      <div className={styles.chapter} id="ch7">
        <div className={styles.chapterNumber}>Chapter 7</div>
        <h2>The Money Trap</h2>

        <div className={styles.chapterPlay}>
          <strong>What you&apos;ll do with this chapter</strong>
          Reframe your next improvement proposal. Instead of &ldquo;what&apos;s the return?&rdquo;, lead with &ldquo;what decision does this make easier?&rdquo; and see how the conversation changes.
        </div>

        <h3>The Question That Stops Everything</h3>

        <p>You&apos;ve been here before.</p>

        <p>You bring something forward. Not a big idea. Just something practical — something that would make the work steadier. Fewer handoffs. Less chasing. Less of the same fire getting fought every other week.</p>

        <p>The response is polite. Thoughtful, even.</p>

        <p>And then the question lands: <em>&ldquo;What&apos;s the ROI on this?&rdquo;</em></p>

        <p>Experienced workers never got angry at this question. They understood it. Money matters. The plant isn&apos;t charity. Resources have to be justified.</p>

        <p>But they also noticed something important. That question wasn&apos;t really asking about value. It was asking whether the conversation was going to happen in the language of finance — or in the language of the floor.</p>

        <h3>Two Languages That Don&apos;t Translate</h3>

        <p>The floor speaks in physical terms.</p>

        <p>Heat. Wear. Vibration. How many times something&apos;s failed in the last six months. How long a recovery takes. How close to the edge something is running right now.</p>

        <p>Finance speaks in outcome terms.</p>

        <p>Return. Payback period. Cost reduction. Margin impact. What happened. What got counted. What can be compared.</p>

        <p>Both are real. Both matter.</p>

        <p>But they don&apos;t match up well — especially early, when the problem is small and the evidence is still mostly in your head.</p>

        <p>Asking someone on the floor to translate &ldquo;this motor is running hot and I&apos;ve seen this pattern twice before and both times it ended badly&rdquo; into a formal ROI projection is like asking someone to describe a smell in a spreadsheet. The information is real. The format doesn&apos;t fit.</p>

        <h3>What ROI Is Good At — and What It Misses</h3>

        <p>Return on investment is a great tool for comparing things that are already understood. This machine versus that machine. This vendor versus that vendor. Build now versus build later.</p>

        <p>It works well when you&apos;re choosing between known options, downstream of the problem.</p>

        <p>Most frontline improvements aren&apos;t like that. They&apos;re not projects. They&apos;re adjustments. They change how fast a problem gets caught. They move permission closer to where the work happens. They reduce the friction that slows things down.</p>

        <p>These things don&apos;t produce a single clean return. They change the shape of future work. Less scrambling. Fewer escalations. More problems handled early instead of late. That&apos;s harder to quantify before the fact.</p>

        <p>Some investments aren&apos;t about return. They&apos;re about not having your back against the wall the next time something goes sideways.</p>

        <div className={styles.pullQuote}>&ldquo;The most expensive decisions get approved fast. The cheapest ones sit in queue for six months.&rdquo;</div>

        <h3>The Pattern You&apos;ve Seen a Hundred Times</h3>

        <p>This one is familiar to everyone who&apos;s worked in a plant for more than a few years.</p>

        <p>A small thing gets deferred because the ROI feels thin. A sensor. A procedure update. A small fix to something that isn&apos;t broken yet, just getting close.</p>

        <p>Time passes. Nothing happens.</p>

        <p>Then it fails. And now the cost is obvious. Downtime. Scrap. Expedited parts. Overtime. Emergency approvals. Everybody working under pressure to fix something that cost $300 to prevent and $30,000 to recover from.</p>

        <p>The fix goes through immediately. Zero debate. Funny how fast money moves when it&apos;s already on fire.</p>

        <p>Same physics. Same system. Ten times the money, and ten times the stress.</p>

        <p>Nobody said &ldquo;I told you so.&rdquo; But everyone on the floor knew. The cheap window was open for months. Then it closed. Then the bill came.</p>

        <h3>A Better First Question</h3>

        <p>There&apos;s a different way to bring an improvement proposal forward.</p>

        <p>Instead of opening with &ldquo;here&apos;s the return,&rdquo; try opening with:</p>

        <ul>
          <li>&ldquo;What decision does this make easier?&rdquo;</li>
          <li>&ldquo;What delay does this remove?&rdquo;</li>
          <li>&ldquo;What problem does this let us catch when it&apos;s still $300 instead of $30,000?&rdquo;</li>
        </ul>

        <p>Those are questions about architecture — about how the work is set up to function. They don&apos;t replace financial questions. They come before them. They shape the conversation so the financial case has something to stand on.</p>

        <p>When you lead with the structural question, something changes. You stop sounding like you&apos;re asking for money. You start sounding like you&apos;re explaining how the system works — and how to make it work better.</p>

        <p>That&apos;s a conversation most good leaders want to have. They just need someone from the floor to start it.</p>

        <div className={styles.chapterDivider}>· · ·</div>

        <div className={styles.exercise}>
          <div className={styles.exerciseLabel}>End of Chapter Exercise</div>
          <h4>Reframe Before You Present</h4>

          <div className={styles.exerciseStep}>
            <strong>Step 1 — Pick an improvement you&apos;ve been sitting on</strong>
            Something practical. Something you know would help. Something that hasn&apos;t gotten traction because the ROI wasn&apos;t obvious enough.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 2 — Rewrite the opening</strong>
            Don&apos;t start with the cost. Start with: &ldquo;This improvement makes [specific decision] faster / easier / cheaper.&rdquo; Name the decision. Name why it matters. The cost and savings come after you&apos;ve established why the structure needs to change.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 3 — Find the deferred cost</strong>
            What&apos;s the cost if you don&apos;t do it — and something goes wrong? Put a rough number on that. You don&apos;t need precision. &ldquo;If we miss this, we&apos;re looking at a minimum of $15,000 in downtime and emergency repair&rdquo; is more than enough.
          </div>

          <div className={styles.exerciseStep}>
            <strong>Step 4 — Present the choice clearly</strong>
            &ldquo;We can spend $400 to fix this now, or we can wait and spend $15,000 when it fails. I&apos;d like to spend the $400. Here&apos;s what I need to move forward.&rdquo; That&apos;s a complete proposal. That&apos;s something a reasonable manager can say yes to.
          </div>
        </div>
      </div>


      {/* CONCLUSION */}
      <div className={styles.conclusion} id="conclusion">
        <div className={styles.conclusionInner}>
          <div className={styles.chapterNumber}>Conclusion</div>
          <h2>Building the Bridge</h2>

          <p>By now, nothing in this book should feel like a new idea.</p>

          <p>It should feel familiar. Like something you already knew, just finally put into words.</p>

          <p>You&apos;ve been living these patterns. You&apos;ve worked around them. You&apos;ve watched good people compensate quietly for systems that took too long to listen — and cost more than they needed to because of it.</p>

          <h3>What Changes When You Name It</h3>

          <p>For years, these things went by other names. Or no names at all.</p>

          <p>Waiting felt like patience. Workarounds felt like being good at your job. Permission delays felt like safety. Experience gaps felt like training problems.</p>

          <p>Once you name them, the conversation shifts.</p>

          <ul>
            <li>Waiting becomes <strong>decision latency</strong> — time between noticing and being allowed to act.</li>
            <li>Workarounds reveal <strong>system burden</strong> — invisible work holding things together.</li>
            <li>Delays trace back to <strong>permission staircases</strong> — how far a signal has to travel before it&apos;s allowed to matter.</li>
            <li>Experience gaps show up as <strong>fragility</strong> — places where the floor depends on people the org chart doesn&apos;t acknowledge.</li>
          </ul>

          <p>Naming doesn&apos;t fix anything by itself. But it lets the right conversations happen — without accusation, without heroics, and without asking the same people to keep carrying the load in silence.</p>

          <h3>A Different Kind of Language</h3>

          <p>For a long time, the people closest to the work were asked to translate upward.</p>

          <p>Translate vibration into ROI. Translate judgment into justifications. Translate a Tuesday feeling into a business case with numbers attached.</p>

          <p>That was never a fair ask.</p>

          <p>The concepts in this book give you a different path. Not a rejection of finance. Not a rejection of leadership. A shared language — one grounded in how work actually happens.</p>

          <p>When you talk about shrinking the permission staircase, moving decisions closer to the signal, removing burden instead of adding dashboards, building floors that don&apos;t depend on one person knowing everything — you&apos;re not arguing for a tool. You&apos;re arguing for a better-designed workplace. One that lets early action happen while it&apos;s still cheap, instead of forcing everything to wait until it&apos;s undeniable.</p>

          <h3>A Simple Goal</h3>

          <p>The goal isn&apos;t speed. It&apos;s smoothness.</p>

          <p>Fewer emergencies. Fewer Friday nights fixing what could&apos;ve been handled on Tuesday. Fewer moments where everyone agrees, afterward, that this didn&apos;t have to be so hard.</p>

          <p>If this book does its job, it gives you language. A way to point — not at people — but at paths, gates, and delays. A way to make the invisible visible, and the quiet costs discussable.</p>

          <p>So the next time you&apos;re in a meeting:</p>

          <p>Instead of saying &ldquo;the pump failed&rdquo; — say &ldquo;we saw this coming, but the staircase was too tall.&rdquo;</p>

          <p>Instead of &ldquo;the rollout slipped&rdquo; — say &ldquo;permission was too far from the signal.&rdquo;</p>

          <p>Instead of &ldquo;the tool isn&apos;t working&rdquo; — say &ldquo;this workaround is carrying real system burden and it needs to be acknowledged.&rdquo;</p>

          <p>That&apos;s not complaint. That&apos;s stewardship. That&apos;s the language of someone who understands how the floor works — and cares enough to say so clearly.</p>

          <div className={styles.finalLines}>
            <p>Shrink the staircase.</p>
            <p>Remove the burden.</p>
            <p>Let permission live closer to the work.</p>
            <p>And let the steady things finally win.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
