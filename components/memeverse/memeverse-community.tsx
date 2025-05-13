"use client"

import { useState } from "react"
import { Users, MessageCircle, Award, Calendar, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MemeverseCommunityProps {
  project: any
}

export function MemeverseCommunity({ project }: MemeverseCommunityProps) {
  const [activeTab, setActiveTab] = useState<"members" | "discussions" | "events">("members")

  // 模拟社区成员数据
  const communityMembers = [
    { id: 1, address: "0x1a2...3b4c", joinDate: "2023-05-01", role: "Core Team", contribution: "High" },
    { id: 2, address: "0x5d6...7e8f", joinDate: "2023-05-02", role: "Moderator", contribution: "Medium" },
    { id: 3, address: "0x9a0...1b2c", joinDate: "2023-05-03", role: "Developer", contribution: "High" },
    { id: 4, address: "0x3d4...5e6f", joinDate: "2023-05-04", role: "Community", contribution: "Low" },
    { id: 5, address: "0x7g8...9h0i", joinDate: "2023-05-05", role: "Community", contribution: "Medium" },
    { id: 6, address: "0xj1k...2l3m", joinDate: "2023-05-06", role: "Community", contribution: "Low" },
    { id: 7, address: "0xn4o...5p6q", joinDate: "2023-05-07", role: "Community", contribution: "Low" },
    { id: 8, address: "0xr7s...8t9u", joinDate: "2023-05-08", role: "Community", contribution: "Low" },
  ]

  // 模拟讨论数据
  const discussions = [
    {
      id: 1,
      title: "Marketing Strategy Discussion",
      author: "0x1a2...3b4c",
      date: "2023-06-10",
      replies: 24,
      views: 156,
      lastActivity: "2023-06-12",
    },
    {
      id: 2,
      title: "Development Roadmap Feedback",
      author: "0x9a0...1b2c",
      date: "2023-06-08",
      replies: 18,
      views: 132,
      lastActivity: "2023-06-11",
    },
    {
      id: 3,
      title: "Community Event Ideas",
      author: "0x5d6...7e8f",
      date: "2023-06-05",
      replies: 32,
      views: 215,
      lastActivity: "2023-06-09",
    },
    {
      id: 4,
      title: "Staking Rewards Proposal",
      author: "0x3d4...5e6f",
      date: "2023-06-03",
      replies: 27,
      views: 189,
      lastActivity: "2023-06-07",
    },
    {
      id: 5,
      title: "Partnership Opportunities",
      author: "0x7g8...9h0i",
      date: "2023-06-01",
      replies: 15,
      views: 124,
      lastActivity: "2023-06-04",
    },
  ]

  // 模拟活动数据
  const events = [
    {
      id: 1,
      title: "Community AMA Session",
      date: "2023-06-15",
      time: "15:00 UTC",
      description: "Join us for a live AMA session with the core team to discuss recent developments and future plans.",
      platform: "Discord",
      link: "#",
    },
    {
      id: 2,
      title: "Meme Contest",
      date: "2023-06-20",
      time: "All Day",
      description: "Create and share your best memes related to the project. Winners will receive token rewards!",
      platform: "Twitter",
      link: "#",
    },
    {
      id: 3,
      title: "Developer Workshop",
      date: "2023-06-25",
      time: "18:00 UTC",
      description: "Learn how to build on top of our ecosystem with this hands-on workshop for developers.",
      platform: "Zoom",
      link: "#",
    },
  ]

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-6">
      {/* 标签页导航 */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-1">
        <div className="flex">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "members"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "discussions"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            onClick={() => setActiveTab("discussions")}
          >
            Discussions
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "events"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
        </div>
      </div>

      {/* 成员标签页 */}
      {activeTab === "members" && (
        <div className="space-y-6">
          {/* 社区统计 */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Community Overview</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Total Members</span>
                </div>
                <div className="text-2xl font-bold text-white">{project.population.toLocaleString()}</div>
                <div className="text-xs text-zinc-400 mt-1">Across all platforms</div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Active Discussions</span>
                </div>
                <div className="text-2xl font-bold text-white">{discussions.length}</div>
                <div className="text-xs text-zinc-400 mt-1">In the last 7 days</div>
              </div>

              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-pink-400" />
                  <span className="text-zinc-300">Contributors</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {communityMembers.filter((m) => m.contribution !== "Low").length}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Active contributors</div>
              </div>
            </div>
          </div>

          {/* 成员列表 */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Community Members</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Address</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Join Date</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {communityMembers.map((member) => (
                    <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white">{member.address}</td>
                      <td className="py-3 px-4 text-zinc-300">{formatDate(member.joinDate)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            member.role === "Core Team"
                              ? "bg-purple-500/20 text-purple-400"
                              : member.role === "Moderator"
                                ? "bg-blue-500/20 text-blue-400"
                                : member.role === "Developer"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            member.contribution === "High"
                              ? "bg-green-500/20 text-green-400"
                              : member.contribution === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          {member.contribution}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-zinc-400">Showing 1-8 of {project.population} members</div>
              <div className="flex gap-2">
                <button className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-zinc-400 text-sm">
                  Previous
                </button>
                <button className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-zinc-400 text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 讨论标签页 */}
      {activeTab === "discussions" && (
        <div className="space-y-6">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Discussions</h3>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm">
                New Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-black/40 rounded-lg p-4 border border-white/5 hover:border-purple-500/30 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">{discussion.title}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-zinc-400">By: {discussion.author}</span>
                        <span className="text-zinc-400">Created: {formatDate(discussion.date)}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-pink-400" />
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="text-zinc-300">
                      <span className="text-pink-400 font-medium">{discussion.replies}</span> replies
                    </div>
                    <div className="text-zinc-300">
                      <span className="text-pink-400 font-medium">{discussion.views}</span> views
                    </div>
                    <div className="text-zinc-300">Last activity: {formatDate(discussion.lastActivity)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 transition-all duration-300"
              >
                View All Discussions
              </Button>
            </div>
          </div>

          {/* 热门标签 */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Popular Tags</h3>

            <div className="flex flex-wrap gap-2">
              {[
                "Development",
                "Marketing",
                "Governance",
                "Staking",
                "Partnerships",
                "Events",
                "Tokenomics",
                "Community",
                "Roadmap",
                "Feature Request",
              ].map((tag, index) => (
                <div
                  key={index}
                  className="bg-black/40 border border-white/5 rounded-full px-3 py-1 text-sm text-zinc-300 hover:border-purple-500/30 hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 活动标签页 */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Upcoming Events</h3>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm">
                Submit Event
              </Button>
            </div>

            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-black/40 rounded-lg p-5 border border-white/5 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* 日期 */}
                    <div className="bg-black/60 rounded-lg p-3 text-center min-w-[100px]">
                      <div className="text-sm text-zinc-400">{formatDate(event.date).split(" ")[0]}</div>
                      <div className="text-2xl font-bold text-white">
                        {formatDate(event.date).split(" ")[1].replace(",", "")}
                      </div>
                      <div className="text-sm text-zinc-400">{event.time}</div>
                    </div>

                    {/* 活动详情 */}
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-white mb-2">{event.title}</h4>
                      <p className="text-zinc-300 text-sm mb-3">{event.description}</p>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span>Platform: {event.platform}</span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div>
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-4 py-2 rounded-lg"
                      >
                        Join Event
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 日历视图 */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Community Calendar</h3>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border border-white/5 text-center">
              <p className="text-zinc-300">
                View and subscribe to our community calendar to stay updated with all events.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 transition-all duration-300"
                >
                  View Calendar
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* 过去的活动 */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Past Events</h3>

            <div className="space-y-4">
              {[
                {
                  id: 101,
                  title: "Launch Celebration",
                  date: "2023-05-15",
                  platform: "Discord",
                  recording: true,
                },
                {
                  id: 102,
                  title: "Developer Meetup",
                  date: "2023-05-25",
                  platform: "Zoom",
                  recording: true,
                },
                {
                  id: 103,
                  title: "Community Feedback Session",
                  date: "2023-06-01",
                  platform: "Twitter Spaces",
                  recording: false,
                },
              ].map((event) => (
                <div key={event.id} className="bg-black/40 rounded-lg p-4 border border-white/5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white">{event.title}</h4>
                      <div className="text-sm text-zinc-400">
                        {formatDate(event.date)} • {event.platform}
                      </div>
                    </div>
                    {event.recording && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 transition-all duration-300"
                      >
                        View Recording
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
