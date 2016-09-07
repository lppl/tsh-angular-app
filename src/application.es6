angular
    .module('paymentsApp', [])
    .controller('PaymentsController', ['$scope', '$http', '$location',
        function PaymentsApp($scope, $http, $location) {

            // queries section
            $scope.params = {
                page: $location.search().page || 0,
                query: $location.search().query || '',
                rating: $location.search().rating || 0
            };
            $scope.reset = () => {
                $scope.params = {page: 0, query: '', rating: 0};
                fetch();
            };
            $scope.submit = () => {
                $scope.params.page = 0;
                fetch();
            };
            $scope.goto = (page) => {
                $scope.params.page = page;
                fetch();
            };

            // Payment modal section
            $scope.payment = null;
            $scope.show_payment = (payment) => {
                $scope.payment = payment;
            };
            $scope.hide_payment = () => {
                $scope.payment = null;
            };

            /**
             * Fetch data from server
             */
            function fetch() {
                $http.get('http://test-api.kuria.tshdev.io/', {params: $scope.params}).then((response) => {
                    const data = response.data;
                    if (typeof data === 'object') {
                        update(data);
                    } else {
                        update({
                            pagination: [],
                            payments: {},
                            info: 'There is no payments matching given query params.'
                        });
                    }
                });
            }

            /**
             * Updates $scope after every fetch
             *
             * @param payments
             * @param pagination
             * @param info
             */
            function update({payments, pagination, info}) {
                const current = parseInt(pagination.current);
                $scope.info = info;
                $scope.payments = payments;
                $scope.pagination = pagination;
                $scope.page_left = pagination.left ? current - 1 : '';
                $scope.page_right = pagination.right ? current + 1 : '';
            }

            // First data fetch
            fetch();
        }
    ]);
