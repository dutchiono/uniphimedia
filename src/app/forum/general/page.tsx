export default function ForumGeneralPage() {
  const threads = [
    { title: "Welcome to the Uni-Phi Forum!", author: "Admin Team", replies: 47, activity: "Today" },
    { title: "What brought you to Uni-Phi?", author: "Sarah M.", replies: 124, activity: "Today" },
    { title: "Midwest Farmsteading tips — share yours", author: "Tom W.", replies: 89, activity: "Today" },
    { title: "Best permaculture books (running list)", author: "David C.", replies: 56, activity: "Today" },
    { title: "Trading seeds and plant starts", author: "Renee B.", replies: 34, activity: "Today" },
    { title: "Questions about Hillshire Hollows", author: "James T.", replies: 22, activity: "Today" },
    { title: "Raffle updates and past winners", author: "Luna R.", replies: 18, activity: "Today" },
    { title: "Introduce yourself here", author: "Admin Team", replies: 203, activity: "Today" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6">
            <a href="/forum" className="text-gold hover:underline text-sm">
              ← Back to Forum
            </a>
          </div>
          <h1 className="font-serif text-5xl mb-4">General Discussion</h1>
          <p className="text-xl opacity-90">Open conversation for all community members.</p>
        </div>
      </header>

      {/* Thread List */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {threads.map((thread, idx) => (
            <div key={idx} className="bg-white border-2 border-bark/20 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-forest font-bold mb-2">{thread.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-bark/70">
                    <span>Posted by <span className="font-semibold">{thread.author}</span></span>
                    <span className="bg-gold/20 text-bark px-3 py-1 rounded-full font-semibold">
                      {thread.replies} replies
                    </span>
                    <span className="text-bark/50">Last activity: {thread.activity}</span>
                  </div>
                </div>
                <a
                  href="#"
                  className="bg-forest text-cream px-6 py-2 rounded-lg hover:bg-forest/90 transition-colors font-semibold ml-6 whitespace-nowrap"
                >
                  View Thread
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Member CTA */}
        <div className="mt-16 bg-gold/10 border-2 border-gold p-8 rounded-lg text-center">
          <h3 className="font-serif text-3xl text-forest mb-3">Want to reply?</h3>
          <p className="text-bark mb-6 text-lg">Become a member to post in the forum.</p>
          <a
            href="/membership"
            className="inline-block bg-forest text-cream px-8 py-3 rounded-lg hover:bg-forest/90 transition-colors font-semibold text-lg"
          >
            View Membership Options
          </a>
        </div>
      </main>
    </div>
  );
}
