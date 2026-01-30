'use client';

import { useState, useEffect } from 'react';
import { getPlayers } from '@/features/players/service';
import { getCoaches } from '@/features/coaches/service';
import { getPosts } from '@/features/posts/service';
import { getUsers } from '@/features/users/service';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        players: 0,
        coaches: 0,
        posts: 0,
        users: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [playersData, coachesData, postsData, usersData] = await Promise.all([
                    getPlayers().catch(() => []),
                    getCoaches().catch(() => []),
                    getPosts().catch(() => []),
                    getUsers().catch(() => [])
                ]);
                setStats({
                    players: playersData.length,
                    coaches: coachesData.length,
                    posts: postsData.length,
                    users: usersData.length
                });
            } catch (err) {
                console.error('Failed to load dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) return <div className="p-8 text-white">Loading Dashboard...</div>;

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-wide">Admin Dashboard</h1>
                    <p className="text-gray-400">System Overview & Controls</p>
                </div>
                <div className="text-right">
                    <p className="text-[var(--brand)] font-bold text-lg">{new Date().toLocaleDateString()}</p>
                </div>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#111] border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-[var(--brand)] transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand)] opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Users</h3>
                    <p className="text-5xl font-black text-white tracking-tight">{stats.users}</p>
                    <p className="text-gray-500 text-xs mt-2">Registered Accounts</p>
                </div>

                <div className="bg-[#111] border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-green-500 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500 opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Players</h3>
                    <p className="text-5xl font-black text-white tracking-tight">{stats.players}</p>
                    <p className="text-green-500 text-xs mt-2 font-bold">Active Roster</p>
                </div>

                <div className="bg-[#111] border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-blue-500 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Coaching Staff</h3>
                    <p className="text-5xl font-black text-white tracking-tight">{stats.coaches}</p>
                    <p className="text-blue-500 text-xs mt-2 font-bold">Active Coaches</p>
                </div>

                <div className="bg-[#111] border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-purple-500 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Blog Posts</h3>
                    <p className="text-5xl font-black text-white tracking-tight">{stats.posts}</p>
                    <p className="text-purple-500 text-xs mt-2 font-bold">Published Content</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-[var(--brand)] rounded-sm"></span>
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/admin/users" className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:bg-gray-900 transition-colors group">
                            <h4 className="text-lg font-bold text-white group-hover:text-[var(--brand)] uppercase mb-2">Manage Users</h4>
                            <p className="text-gray-500 text-sm">Create, edit, or remove user accounts and assign roles.</p>
                        </Link>
                        <Link href="/admin/players" className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:bg-gray-900 transition-colors group">
                            <h4 className="text-lg font-bold text-white group-hover:text-green-500 uppercase mb-2">Manage Players</h4>
                            <p className="text-gray-500 text-sm">Update player stats, profiles, and physical data.</p>
                        </Link>
                        <Link href="/admin/posts" className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:bg-gray-900 transition-colors group">
                            <h4 className="text-lg font-bold text-white group-hover:text-purple-500 uppercase mb-2">Write News</h4>
                            <p className="text-gray-500 text-sm">Publish new articles or announcements to the blog.</p>
                        </Link>
                        <Link href="/admin/attendance" className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:bg-gray-900 transition-colors group">
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-500 uppercase mb-2">Check Attendance</h4>
                            <p className="text-gray-500 text-sm">View attendance logs and training participation.</p>
                        </Link>
                    </div>
                </div>

                {/* System Activity (Mock) */}
                <div>
                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-gray-600 rounded-sm"></span>
                        Recent Activity
                    </h3>
                    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                            <div>
                                <p className="text-white text-sm font-bold">System Online</p>
                                <p className="text-gray-500 text-xs">All services operational</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                            <div>
                                <p className="text-white text-sm font-bold">Database Backup</p>
                                <p className="text-gray-500 text-xs">Completed at 04:00 AM</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-[var(--brand)]"></div>
                            <div>
                                <p className="text-white text-sm font-bold">New Version</p>
                                <p className="text-gray-500 text-xs">v1.2.0 deployed successfully</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
