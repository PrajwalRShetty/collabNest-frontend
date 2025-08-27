import React from "react";

const PublicHomepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
        </div>

        {/* Main Title */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="border-4 border-yellow-200 p-8 md:p-12 lg:p-16 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-2xl">
            <h1 className="font-bold text-yellow-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide">
              CollabNest
            </h1>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
            <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Bridge the gap between learning and real-world experience through collaborative innovation
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gradient-to-r from-red-400 to-pink-500 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-16">
            Why Choose CollabNest?
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-lg md:text-xl text-white leading-relaxed mb-8">
                At CollabNest, we bridge the gap between learning and real-world experience by connecting students with project sponsors, innovators, and peers for hands-on collaboration and continuous skill development.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-8 md:gap-12">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-red-100 mb-3">
                      Real-World Projects, Real Impact
                    </h4>
                    <p className="text-white leading-relaxed">
                      CollabNest empowers students to apply their knowledge by working on real-world projects posted by businesses, startups, and innovators. 
                      It's more than just learning—it's about solving real challenges and building a portfolio that matters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-red-100 mb-3">
                      Skill Exchange Community
                    </h4>
                    <p className="text-white leading-relaxed">
                      Students can share their learning paths, including the tools and resources they used to gain skills. By connecting with peers, they can explore diverse approaches and learn from each other's experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-red-100 mb-3">
                      Build, Lead, Innovate
                    </h4>
                    <p className="text-white leading-relaxed">
                      Students don't just participate—they lead. CollabNest enables students to act as project sponsors too, pitching their own ideas, forming teams, and managing projects. It's a place to innovate, lead, and grow.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-red-100 mb-3">
                      A Thriving Collaborative Ecosystem
                    </h4>
                    <p className="text-white leading-relaxed">
                      CollabNest is designed for mutual growth. Project sponsors get skilled contributors; students gain practical experience. Together, they form a vibrant ecosystem where collaboration, creativity, and continuous improvement thrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicHomepage;
