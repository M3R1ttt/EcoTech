angular.module('myApp', [])
.controller('DuyurularController', ['$scope', function($scope) {
    $scope.duyurular = [
        {
        baslik: "MEZ Bilişim'e Teşekkürler",
        aciklama: "Sizlere gururla duyurmak isteriz ki, EcoTech olarak büyük bir adım attık ve şirketimizin dijital varlığını güçlendirmek için önemli bir adım daha atmaya hazırlanıyoruz. Bu adımda, bize destek olan değerli sponsorumuz Mez Bilişime derin bir teşekkür borçluyuz. Mez Bilişim, bizim için sadece bir sponsor değil, aynı zamanda güçlü bir iş ortağıdır. Sunduğunuz domain ve hosting hizmetleriyle, bizim dijital varlığımızı güvenli ve güçlü bir şekilde desteklediniz. Sizlerin desteği olmadan bu başarıya ulaşmamız mümkün olmayacaktı. Bu vesileyle, bize sağladığınız destek ve güven için sizlere içtenlikle teşekkür ederiz. Mez Bilişim'in bizimle birlikte bu yolculukta yer alması, bizim için büyük bir onurdur.",
        imageUrl: "https://media.licdn.com/dms/image/C4E0BAQH0sBTOu3EbTA/company-logo_200_200/0/1630621747502?e=2147483647&v=beta&t=-cX1JiHgnXbWr_SM9VDciMaf51XFHs-6ABdBgYhiqeA"
    },
    {
        baslik: "Ercan Burger'e Teşekkürler",
        aciklama: "Sizlere büyük bir gururla duyurmak isteriz ki, EcoTech olarak büyük bir adım attık ve ürünlerimizin geliştirilmesi ve geniş kitlelere ulaştırılması için desteklerinizi arkamızda hissediyoruz. Bu desteklerin en önemlilerinden biri de Ercan Burger'in bize sağladığı sponsorluktur.",
        imageUrl: "https://nevco.restapp.com/uploads/13497/theme/c6b0926a75ee8138a584d157f7f6b6fc.png"
    },
    {
        baslik: "Yıldız Teknik Üniversitesi Maçka Mesleki ve Teknik Anadolu Lisesine Teşekkürler",
        aciklama: "Bizler Yıldız Teknik Üniversitesi Maçka Mesleki ve Teknik Anadolu Lisesi olarak katıldığımız yarışmada gösterdiğiniz büyük destek için size minnettarız. Sizlerin sağladığı rehberlik ve teşvikle, hedeflerimize bir adım daha yaklaşma şansını bulduk.",
        imageUrl: "https://pbs.twimg.com/profile_images/1563819254134280192/7JGuOccN_400x400.jpg"
    }
    ];

}]);