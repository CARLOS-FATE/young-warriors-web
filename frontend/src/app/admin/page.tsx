export default function AdminDashboard() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Dashboard</h1>
                <p className="text-gray-400">Welcome back to the command center.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Total Players</h3>
                    <p className="text-4xl font-bold text-white tracking-tight">--</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Active Coaches</h3>
                    <p className="text-4xl font-bold text-white tracking-tight">--</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Blog Posts</h3>
                    <p className="text-4xl font-bold text-white tracking-tight">--</p>
                </div>
            </div>
        </div>
    )
}
