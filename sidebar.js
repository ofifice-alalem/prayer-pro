// Sidebar Component for Prayer Tracking App
class PrayerSidebar {
    constructor() {
        this.isOpen = localStorage.getItem('sidebarOpen') === 'true';
        this.currentUser = localStorage.getItem('currentUser');
        this.init();
    }

    init() {
        this.createSidebar();
        this.attachEventListeners();
        this.updateUserInfo();

        // Set initial state - always open on large screens, closed on mobile
        setTimeout(() => {
            if (window.innerWidth >= 1024) {
                this.openSidebar();
            } else {
                this.closeSidebar();
            }
        }, 100);
    }

    createSidebar() {
        const sidebarHTML = `
            <style>
                @media (min-width: 1024px) {
                    #sidebar {
                        transform: translateX(0) !important;
                        position: fixed !important;
                        right: 0 !important;
                        top: 0 !important;
                        height: 100vh !important;
                        width: 16rem !important;
                        z-index: 40 !important;
                        display: block !important;
                        visibility: visible !important;
                    }
                }
                @media (max-width: 1023px) {
                    body {
                        padding-top: 4rem !important;
                    }
                }
                #sidebar {
                    overflow-y: auto;
                }
            </style>
            <!-- Mobile Header -->
            <div class="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-40 px-4 py-3 flex items-center justify-between">
                <button id="sidebar-toggle" class="flex items-center gap-2 transition-colors" style="padding: 5px 10px 5px 20px; border-radius: 10px; border: 2px solid #eee;">
                    <span class="text-lg" style="background-color: #eee; padding: 2px 4px 0px; border-radius: 4px;">🏠</span>
                    <span class="text-sm font-medium" style="color: #b3a3a3;font-weight:700;padding-top:5px ">القائمة</span>
                </button>
                <div class="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-200">
                    <span class="text-lg">📊</span>
                    <span id="mobile-total-percentage" class="font-bold text-blue-600">0%</span>
                </div>
            </div>

            <!-- Sidebar Overlay -->
            <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"></div>

            <!-- Sidebar -->
            <div id="sidebar" class="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 z-50 lg:translate-x-0 lg:w-64 lg:shadow-none lg:border-l lg:border-gray-200">
                <div class="flex flex-col h-full">
                    <!-- Header -->
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-2xl">🕌</div>
                            <button id="sidebar-close" class="lg:hidden text-gray-500 hover:text-gray-700">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <h2 class="text-xl font-bold text-gray-800">تطبيق متابعة الصلاة</h2>
                        
                        <!-- User Info -->
                        <div id="user-info" class="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div id="user-avatar" class="text-2xl ml-3">👤</div>
                                <div>
                                    <div id="user-name" class="font-semibold text-gray-800">المستخدم</div>
                                    <div class="text-sm text-gray-500">مرحباً بك</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Menu -->
                    <nav class="flex-1 p-4">
                        <ul class="space-y-2">
                            <li>
                                <a href="prayer-dashboard.html" class="nav-item flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                                    <span class="text-xl ml-3">📊</span>
                                    <span>اللوحة الرئيسية</span>
                                </a>
                            </li>
                            <li>
                                <a href="table-view.html" class="nav-item flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                                    <span class="text-xl ml-3">📋</span>
                                    <span>العرض الجدولي</span>
                                </a>
                            </li>
                            <li>
                                <a href="monthly-report.html" class="nav-item flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                                    <span class="text-xl ml-3">📅</span>
                                    <span>التقرير الشهري</span>
                                </a>
                            </li>
                            <li>
                                <a href="missed-prayers-summary.html" class="nav-item flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                                    <span class="text-xl ml-3">⚠️</span>
                                    <span>الصلوات المفقودة</span>
                                </a>
                            </li>
                            <li>
                                <a href="missed-rakaat-summary.html" class="nav-item flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                                    <span class="text-xl ml-3">🔢</span>
                                    <span>الركعات الفائتة</span>
                                </a>
                            </li>
                        </ul>

                        <!-- Divider -->
                        <hr class="my-6 border-gray-200">

                        <!-- Actions -->
                        <div class="space-y-2">
                            <button onclick="exportData()" class="w-full flex items-center p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                                <span class="text-xl ml-3">💾</span>
                                <span>تصدير البيانات</span>
                            </button>
                            <button onclick="importData()" class="w-full flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                                <span class="text-xl ml-3">📁</span>
                                <span>استيراد البيانات</span>
                            </button>
                            <button onclick="changeUser()" class="w-full flex items-center p-3 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200">
                                <span class="text-xl ml-3">👥</span>
                                <span>تغيير المستخدم</span>
                            </button>
                        </div>
                    </nav>

                    <!-- Footer -->
                    <div class="p-4 border-t border-gray-200">
                        <div class="text-center text-sm text-gray-500">
                            <p>بارك الله فيك وتقبل منك صالح الأعمال</p>
                            <p class="mt-1">🤲</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Import File Input -->
            <input type="file" id="import-file-input" accept=".json" class="hidden">
            
            <!-- Change User Modal -->
            <div id="change-user-modal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm hidden items-center justify-center z-[99999]">
                <div class="bg-white rounded-2xl max-w-sm mx-4 shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 opacity-0" id="change-user-modal-content">
                    <!-- Modal Header -->
                    <div class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 text-center">
                        <div class="text-4xl mb-2">👥</div>
                        <h3 class="text-xl font-bold">تغيير المستخدم</h3>
                    </div>
                    
                    <!-- Modal Body -->
                    <div class="p-6 text-center">
                        <p class="text-gray-700 mb-6 text-lg">هل تريد تغيير المستخدم؟<br>سيتم توجيهك لصفحة اختيار المستخدم.</p>
                        
                        <!-- Action Buttons -->
                        <div class="flex gap-3">
                            <button onclick="confirmChangeUser()" class="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md">
                                نعم، تغيير
                            </button>
                            <button onclick="closeChangeUserModal()" class="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md">
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
    }

    attachEventListeners() {
        // Toggle sidebar
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Close sidebar
        document.getElementById('sidebar-close').addEventListener('click', () => {
            this.closeSidebar();
        });

        // Close sidebar when clicking overlay
        document.getElementById('sidebar-overlay').addEventListener('click', () => {
            this.closeSidebar();
        });

        // Import file handler
        document.getElementById('import-file-input').addEventListener('change', (e) => {
            // handleImport is a global function defined below
            handleImport(e);
        });

        // Highlight current page
        this.highlightCurrentPage();

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                this.openSidebar();
            } else {
                this.closeSidebar();
            }
        });
    }

    toggleSidebar() {
        // Only toggle on mobile screens
        if (window.innerWidth >= 1024) {
            return;
        }

        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        this.isOpen = true;
        localStorage.setItem('sidebarOpen', 'true');

        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('translate-x-full');

        // Force show on large screens
        if (window.innerWidth >= 1024) {
            sidebar.style.transform = 'translateX(0)';
            sidebar.style.display = 'block';
        }

        // Only show overlay on mobile
        if (window.innerWidth < 1024) {
            document.getElementById('sidebar-overlay').classList.remove('hidden');
        }
    }

    closeSidebar() {
        // Don't close on large screens
        if (window.innerWidth >= 1024) {
            return;
        }

        this.isOpen = false;
        localStorage.setItem('sidebarOpen', 'false');

        document.getElementById('sidebar').classList.add('translate-x-full');
        document.getElementById('sidebar-overlay').classList.add('hidden');
    }

    updateUserInfo() {
        if (!this.currentUser) return;

        const userProfile = JSON.parse(localStorage.getItem(`user_${this.currentUser}`) || '{}');

        if (userProfile.username) {
            document.getElementById('user-name').textContent = userProfile.username;
            document.getElementById('user-avatar').textContent = userProfile.avatar || '👤';
        }

        this.updateMobileTotalPercentage();
    }

    updateMobileTotalPercentage() {
        if (!this.currentUser) return;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const key = `prayers_${this.currentUser}_${year}_${month}`;
        const monthData = JSON.parse(localStorage.getItem(key) || '{}');
        const today = new Date();
        const daysInMonth = new Date(year, month, 0).getDate();

        // Find the first day with data (earliest day user started recording)
        const daysWithDataKeys = Object.keys(monthData).map(day => parseInt(day)).filter(day => {
            const dayDate = new Date(year, month - 1, day);
            return dayDate <= today;
        }).sort((a, b) => a - b);

        const firstDayWithData = daysWithDataKeys.length > 0 ? daysWithDataKeys[0] : today.getDate();
        const lastDayToCalculate = Math.min(today.getDate(), daysInMonth);

        let totalCompleted = 0;
        let totalPossible = 0;

        // Calculate from first day with data to current day
        for (let day = firstDayWithData; day <= lastDayToCalculate; day++) {
            const dayData = monthData[day] || {};
            const fardPrayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
            const naflPrayers = ['fajr-sunnah', 'duha', 'witr'];

            fardPrayers.forEach(prayer => {
                totalPossible++;
                if (dayData[prayer] && dayData[prayer].completed) {
                    totalCompleted++;
                }
            });

            naflPrayers.forEach(prayer => {
                totalPossible++;
                if (dayData[prayer]) {
                    totalCompleted++;
                }
            });
        }

        const percentage = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
        const mobilePercentageElement = document.getElementById('mobile-total-percentage');
        if (mobilePercentageElement) {
            mobilePercentageElement.textContent = percentage + '%';
        }
    }

    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('bg-blue-100', 'text-blue-600', 'font-semibold');
            }
        });
    }
}

// Global functions for sidebar actions
function exportData() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('لا يوجد مستخدم محدد');
        return;
    }

    const exportData = {
        exportDate: new Date().toISOString(),
        user: currentUser,
        userData: {},
        prayerData: {}
    };

    // Export user profile
    const userProfile = localStorage.getItem(`user_${currentUser}`);
    if (userProfile) {
        exportData.userData[currentUser] = JSON.parse(userProfile);
    }

    // Export prayer data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`prayers_${currentUser}_`)) {
            exportData.prayerData[key] = JSON.parse(localStorage.getItem(key));
        }
    }

    // Create and download file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prayer_data_${currentUser}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('تم تصدير البيانات بنجاح! 💾');
}

function importData() {
    document.getElementById('import-file-input').click();
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            // Import user data
            if (data.userData) {
                Object.keys(data.userData).forEach(username => {
                    localStorage.setItem(`user_${username}`, JSON.stringify(data.userData[username]));
                });
            }

            // Import prayer data
            if (data.prayerData) {
                Object.keys(data.prayerData).forEach(key => {
                    localStorage.setItem(key, JSON.stringify(data.prayerData[key]));
                });
            }

            alert('تم استيراد البيانات بنجاح! 📁');
            location.reload();
        } catch (error) {
            alert('خطأ في قراءة الملف. تأكد من أن الملف صحيح.');
        }
    };
    reader.readAsText(file);
}

function changeUser() {
    showChangeUserModal();
}

function showChangeUserModal() {
    const modal = document.getElementById('change-user-modal');
    const modalContent = document.getElementById('change-user-modal-content');

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeChangeUserModal() {
    const modal = document.getElementById('change-user-modal');
    const modalContent = document.getElementById('change-user-modal-content');

    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

function confirmChangeUser() {
    window.location.href = 'user-select.html';
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('user-select.html') && !window.location.pathname.includes('user-setup.html') && !window.location.pathname.includes('index.html') && !window.location.pathname.includes('test-sidebar.html')) {
        window.location.href = 'user-select.html';
        return;
    }

    // Initialize sidebar only if not on login pages
    if (currentUser && !window.location.pathname.includes('user-select.html') && !window.location.pathname.includes('user-setup.html') && !window.location.pathname.includes('index.html')) {
        // Add small delay to ensure DOM is fully ready
        setTimeout(() => {
            new PrayerSidebar();
        }, 50);
    }
});