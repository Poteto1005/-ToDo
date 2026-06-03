document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       スクロール時のフェードインアニメーション
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const fadeObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 1回だけアニメーションを実行
            }
        });
    }, fadeObserverOptions);
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    /* ==========================================================================
       モーダルの開閉操作
       ========================================================================== */
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtns = document.querySelectorAll('.close-modal-btn');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    // モーダルを開く
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // 背景のスクロールを停止
            }
        });
    });

    // 閉じるボタンでモーダルを閉じる
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('active');
            document.body.style.overflow = ''; // 背景のスクロールを有効化
            resetSearchForm(); // 空席照会モーダルを閉じる際に検索状態をリセット
        });
    });

    // コンテンツの外側をクリックしてモーダルを閉じる
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                resetSearchForm();
            }
        });
    });

    /* ==========================================================================
       模擬空席検索フォームの処理
       ========================================================================== */
    const searchForm = document.getElementById('booking-search-form');
    const searchLoading = document.getElementById('search-loading');
    const searchResults = document.getElementById('search-results');

    if (searchForm) {
        // 入力フォームの初期日付を設定（本日および3日後）
        const depDateInput = document.getElementById('dep-date');
        const retDateInput = document.getElementById('ret-date');
        
        if (depDateInput && retDateInput) {
            const today = new Date();
            const threeDaysLater = new Date();
            threeDaysLater.setDate(today.getDate() + 3);

            depDateInput.value = today.toISOString().split('T')[0];
            retDateInput.value = threeDaysLater.toISOString().split('T')[0];
        }

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 通常のページリロードを防ぐ

            // フォームを非表示にし、ローディングスピナーを表示
            searchForm.classList.add('hidden');
            searchLoading.classList.remove('hidden');

            // 航空便検索APIの遅延をシミュレート（1.8秒）
            setTimeout(() => {
                searchLoading.classList.add('hidden');
                searchResults.classList.remove('hidden');
            }, 1800);
        });
    }

    // 検索モーダルを元のフォーム表示にリセットする関数
    function resetSearchForm() {
        if (searchForm && searchLoading && searchResults) {
            searchForm.classList.remove('hidden');
            searchLoading.classList.add('hidden');
            searchResults.classList.add('hidden');
        }
    }

    // おすすめプラン内の「詳細・予約」アクション
    const planDetailBtns = document.querySelectorAll('.btn-select-plan');
    planDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const planTitle = btn.closest('.plan-item').querySelector('h4').textContent;
            alert(`「${planTitle}」の詳細・手続きに進みます。`);
        });
    });
});
